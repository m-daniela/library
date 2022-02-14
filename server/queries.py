import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func

from schemas import UserCreateSchema, UserLoginSchema, BookSchema
from models import User, Registration, Book
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
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book



def get_books(db: Session):
    """
    Get the list of books
    Will add pagination later
    """
    return db.query(Book).filter(Book.stock > 0).all()

def get_books_by_query(db: Session, query: str):
    """
    Get the list of books with the given query contained in the title
    """
    return db.query(Book).filter(Book.stock > 0, func.lower(Book.title).contains(query.lower())).all()


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

def get_registrations(db: Session, email: str):
    """
    Get all registrations for a user
    """
    user = get_user(db, email)
    books = user.books
    return books

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
        registration.checkout = datetime.datetime.utcnow()
        db.commit()
        return registration
    else:
        raise CustomError("You have already checked out this book")
