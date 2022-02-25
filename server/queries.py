import datetime
from connection import db
from models import User, Book, Registration
from schemas import BookSchema, UserSchema
from exception import CustomError, CustomNotFoundError

def get_user(email: str):
    """
    Get the user from the database
    """
    user = User.query.filter_by(email=email).first()
    if not user:
        CustomNotFoundError("The user does not exist")
    return user


def login_user(user: UserSchema) -> UserSchema:
    """
    Login the user and return the username and permissions
    """
    found_user = get_user(user.get("email"))
    found_user = User.query.filter_by(email=user.get("email"), password=user.get("password")).first()

    if not user:
        CustomNotFoundError("The user does not exist")

    return {
        "email": found_user.email, 
        "role": found_user.role
    }


def create_user(user: UserSchema) -> User:
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


def get_book(book_id: int):
    """
    Get the book with the given id
    """
    book = Book.query.filter_by(id=book_id).first()
    if not book:
        CustomNotFoundError("The book does not exist")
    return book

def update_book_stock(book: Book, stock: int):
    """
    Update the book stock
    """
    if book:
        if book.stock <= 0 and stock == -1:
            raise CustomError("No books left with this title")
        else:
            book.stock += stock
    db.commit()


def checkin(book_id: int, email: str):
    """
    Register the given book for the user
    """
    user = get_user(email)
    book = get_book(book_id)
    update_book_stock(book, -1)

    registration = Registration(book_id=book.id, email=user.email)
    
    db.add(registration)
    db.commit()
    db.refresh(registration)

    return registration


def checkout(book_id: int, email: str):
    """
    Checkout the book for the user
    """
    book = get_book(book_id)
    user = get_user(email)
    
    registration = Registration.query.filter_by(book_id=book.id, email=user.email).first()

    if not registration:
        raise CustomError("The registration does not exist")

    if not registration.checkout:
        update_book_stock(book, 1)
        registration.checkout = datetime.datetime.now()

        db.commit()

        return registration
    else:
        raise CustomError("You have already checked out this book")


def get_registrations_for_user(email: str):
    """
    Get the books for the given user
    """
    # uses the nested fields property set on the schemas
    user = get_user(email)
    registrations = User.query.filter_by(email=user.email).first()
    return registrations