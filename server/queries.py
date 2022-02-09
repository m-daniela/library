import datetime
from connection import db
from models import User, Book, Registration
from schemas import BookSchema, UserSchema
from exception import CustomError

def get_user(email: str):
    """
    Get the user from the database
    """
    return User.query.filter_by(email=email).first()


def login_user(user: UserSchema):
    """
    Login the user and return the 
    """
    found_user = User.query.filter_by(email=user["email"], password=user["password"]).first()
    if found_user is not None:
        found_user = {
            "email": found_user.email, 
            "role": found_user.role
        }
    return found_user


def create_user(user: UserSchema):
    """
    Add a new user if not already in the database
    """
    new_user = User(email=user["email"], password=user["password"], role=user["role"])
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user



def get_books():
    """
    Get the list of books
    TODO: Will add pagination later
    OBS: use paginate(page, per_page, error_out)
    error_out - if no items are found or page is wrong
    """
    return Book.query.all()


def add_book(book: BookSchema):
    """
    Add a new book
    """
    new_book = Book(title=book["title"], cover=book["cover"], description=book["description"], stock=book["stock"])
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


def update_book_stock(book_id: int, stock: int):
    """
    Update the book stock
    """
    book = Book.query.filter_by(id=book_id).first()
    if book is not None:
        if stock < 0 and stock > 0:
            raise CustomError("No books left")
        else:
            book.stock += stock
    db.commit()
    return book


def checkin(book_id: int, email: str):
    """
    Register the given book for the user
    """
    book = update_book_stock(book_id, -1)
    user = get_user(email)

    registration = Registration(book_id=book.id, email=user.email)
    db.add(registration)
    db.commit()
    db.refresh(registration)
    print(registration)

    return registration

def checkout(book_id: int, email: str):
    """
    Checkout the book for the user
    """
    book = update_book_stock(book_id, 1)
    user = get_user(email)
    registration = Registration.query.filter_by(book_id=book.id, email=user.email).first()
    registration.checkout = datetime.datetime.utcnow()

    db.commit()

    return registration


def get_registrations_for_user(email: str):
    """
    Get the books for the given user
    """

    # join on registration.book_id == book.id
    # registrations = Registration\
    #     .query\
    #     .join(Book, Registration.book_id == Book.id)\
    #     .add_columns(Registration.email, Registration.checkin, Registration.checkout, Book.id, Book.title, Book.cover, Book.description, Book.stock)\
    #     .filter(Registration.email == email)

    # uses the nested fields property set on the schemas
    registrations = User.query.filter_by(email=email).first()
    return registrations
    