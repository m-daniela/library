import datetime
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func

from schemas import AuthorSchema, BookUpdateSchema, FilterBuilder, MessageSchema, UserCreateSchema, UserLoginSchema, BookSchema
from models import Author, Message, Room, Tag, User, Registration, Book
from exception import CustomError, custom_not_found_exception
from authentication import password_hash

# users

def get_user(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise custom_not_found_exception("The user does not exist")
    return user


def create_user(db: Session, user: UserCreateSchema):
    """
    Add a new user
    """
    hashed_pass = password_hash(user.password)
    new_user = User(email=user.email, password=hashed_pass, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user



def change_password(db: Session, user: UserLoginSchema, new_password: str):
    """
    Change the password of the given user
    """
    user.password = password_hash(new_password)
    db.commit()

        

# books

def add_book(db: Session, book: BookSchema):
    """
    Add a new book
    """
    new_book = Book(cover=book.cover, title=book.title, description=book.description, stock=book.stock)

    for tag in book.tags:
        if len(tag) != 0:
            current_tag = add_tag(db, tag)
            new_book.tags.append(current_tag)

    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    
    return new_book


def update_book(db: Session, book_id: int, book: BookUpdateSchema):
    """
    Update a book
    """
    old_book = get_book(db, book_id)

    old_book.cover = book.cover
    old_book.description = book.description
    old_book.stock = book.stock

    removed_tags = set(old_book.tags) - set(book.tags)
    print(removed_tags)
    for tag in removed_tags:
        old_book.tags.remove(tag)

    for tag in book.tags:
        if len(tag) != 0:
            current_tag = add_tag(db, tag)
            old_book.tags.append(current_tag)

    db.commit()
    db.refresh(old_book)

    return old_book



def get_books(db: Session, query: Optional[str], order: Optional[str], sorting: Optional[str], filter: Optional[int], page: int, offset: int = 10):
    """
    Get the books based on the given criteria
    The query is built step by step, based on 
    the given filter parameters
    Approach using a custom builder
    """
    initial_query = db.query(Book)
    book_query = FilterBuilder(initial_query)

    if query:
        book_query.add_filter(func.lower(Book.title).contains(query.lower()))

    # the filter checks only if the books is available (stock > 0)
    if filter == 1:
        book_query.add_filter(Book.stock > 0)
    elif filter == 0:
        book_query.add_filter(Book.stock == 0)

    if order == "stock":
        book_query.add_order(Book.stock, sorting)
    elif order == "title":
        book_query.add_order(Book.title, sorting)

    start_page = (page - 1) * offset 

    return book_query.get_query().offset(start_page).limit(offset).all()



def get_book(db: Session, book_id: int):
    """
    Get the book with the given id
    """
    book = db.query(Book).get(book_id)
    if not book:
        raise custom_not_found_exception("The book does not exist")
    return book


def update_book_stock(db: Session, book: Book, stock: int):
    """
    Update the book stock
    """
    if book:
        if book.stock <= 0 and stock == -1:
            raise CustomError("No books left with this title")
        else:
            book.stock += stock
    db.commit()



# registrations


def get_filtered_registrations(db: Session, email: str, query: Optional[str], order: Optional[str], sorting: Optional[str], filter: Optional[int]):
    """
    Filter the registrations for a user based on
    the given criteria
    """

    initial_query = db.query(Registration)\
        .join(Book)\
        .filter(Registration.email == email)

    registrations_query = FilterBuilder(initial_query)

    if query:
        registrations_query.add_filter(func.lower(Book.title).contains(query.lower()))

    # the filter checks only if the book was checked out or not 
    if filter == 1:
        registrations_query.add_filter(Registration.checkout != None)
    elif filter == 0:
        registrations_query.add_filter(Registration.checkout == None)

    if order == "checkout":
        registrations_query.add_order(Registration.checkout, sorting)
    elif order == "title":
        registrations_query.add_order(Book.title, sorting)
    else:
        registrations_query.add_order(Registration.checkin, sorting)

    return registrations_query.get_query().all()


def get_report(db: Session, email: str):
    """
    Display the books borrowed by the user in the
    past week
    """

    week_ago = datetime.datetime.now(tz=datetime.timezone.utc) - datetime.timedelta(days=7)

    result = db.query(Registration)\
        .join(Book)\
        .filter(Registration.email == email, Registration.checkin >= week_ago)\
        .order_by(Registration.checkout.desc())\
        .all()

    return result


def checkin(db: Session, email: str, book_id: int):
    """
    Register the given book for the user
    """
    user = get_user(db, email)
    book = get_book(db, book_id)

    found_registration = db.query(Registration).filter(Registration.book_id == book.id, Registration.email == user.email).first()
    
    if not found_registration:
        update_book_stock(db, book, -1)

        registration = Registration(email=user.email, book_id=book.id)
        db.add(registration)
        db.commit()
        db.refresh(registration)
        return {"registration": registration, "book": book}
    else:
        raise CustomError("You have already checked in this book")



def checkout(db: Session, email: str, book_id: int):
    """
    Checkout the book for the user
    """

    user = get_user(db, email)
    book = get_book(db, book_id)

    registration = db.query(Registration).filter(Registration.email == user.email, Registration.book_id == book.id).first()

    if not registration:
        raise custom_not_found_exception("The registration does not exist")

    if not registration.checkout:
        update_book_stock(db, book, 1)
        registration.checkout = datetime.datetime.now(tz=datetime.timezone.utc)
        db.commit()
        db.refresh(registration)
        return registration
    else:
        raise CustomError("You have already checked out this book")


def delete_registration(db: Session, email: str, book_id: int):
    """
    Delete a registration
    You can do this only if the book was checked out
    """

    user = get_user(db, email)
    book = get_book(db, book_id)

    # week_ago = datetime.datetime.now(tz=datetime.timezone.utc) - datetime.timedelta(days=7)

    registration_query = db.query(Registration)\
        .filter(Registration.email == user.email, Registration.book_id == book.id, Registration.checkout != None)

    registration = registration_query.first()

    if registration:
        registration_query.delete()
        db.commit()
        return registration
    else:
        raise CustomError("This registration does not exist or the book wasn't checked out")


# messages

def get_room(db: Session, room: str):
    """
    Get the room with the given name
    If it doesn't exist, add it to the 
    database and return the result
    """
    found_room = db.query(Room).filter(Room.room_name == room).first()

    if not found_room:
        new_room = Room(room_name=room)
        db.add(new_room)
        db.commit()
        db.refresh(new_room)
        found_room = new_room
    
    return found_room


def add_message(db: Session, message: MessageSchema) -> MessageSchema:
    """
    Add a new message 
    """
    room = get_room(db, message.room_name)
    new_message = Message(room_name=room.room_name, sender=message.sender, receiver=message.receiver, text=message.text)
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    print(new_message)

    return new_message


def get_messages(db: Session, room: str):
    """
    Get the messages from a specific room
    """
    result = db.query(Room).filter(Room.room_name == room).first()
    if not result: 
        return []
    return result.messages


def get_chats(db: Session):
    """
    Get all chats and the messages
    """
    result = db.query(Room.room_name).all()
    return result


# tags

def add_tag(db: Session, tag: str):
    """
    Search for the given tag and, if not found,
    add it to the database
    """
    search_tag = db.query(Tag).filter(Tag.name == tag).first()
    if not search_tag:
        new_tag = Tag(name=tag)
        db.add(new_tag)
        db.commit()
        db.refresh(new_tag)
        return new_tag
    return search_tag


def search_tags(db: Session, search: str):
    """
    Search the tag based on the given string
    """
    tags = db.query(Tag).filter(func.lower(Tag.name).startswith(search.lower())).limit(3).all()
    return tags


# authors

def add_author(db: Session, author: AuthorSchema):
    """
    Add a new author
    """
    print(author, 23)
    new_author = Author(name=author.name, date_of_birth=author.date_of_birth)
    db.add(new_author)
    db.commit()
    db.refresh(new_author)
    
    return new_author


