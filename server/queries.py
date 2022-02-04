import datetime
from math import perm
from sqlalchemy.orm import Session

import models, schemas, exception


# users

def get_user(db: Session, email):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> schemas.UserBase:
    """
    Add a new user
    """
    try:
        new_user = models.User(email=user.email, password=user.password, role=user.role)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e:
        print(e)
    return new_user


def check_user(db: Session, user: schemas.UserLogin):
    """
    Check if the user is an admin or a normal user
    If an admin, return True, False otherwise
    TODO: change format
    """
    found_user = db.query(models.User).filter(models.User.email == user.email, models.User.password == user.password).first()
    permissions = None
    if found_user is not None:
        if found_user.role == "admin":
            permissions = True
        else:
            permissions = False
        result = {
            "email": found_user.email,
            "role": found_user.role,
            "permissions": permissions
        }
        return result
    else:
        raise Exception("The email or password is wrong. Try again.")


# books

def add_book(db: Session, book: schemas.Book):
    """
    Add a new book
    """
    new_book = models.Book(cover=book.cover, title=book.title, description=book.description, stock=book.stock)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book



def get_books(db: Session):
    """
    Get the list of books
    Will add pagination later
    """
    return db.query(models.Book).all()


def update_book_stock(db: Session, book_id: int, stock: int):
    """
    Update the book stock
    """
    book = db.query(models.Book).get(book_id)
    if book is not None:
        if stock < 0 and book.stock <= 0:
            raise exception.CustomError("No books left")
        else:
            book.stock += stock
    db.commit()
    return book

# registrations

def get_registrations(db: Session, email: str):
    """
    Get all registrations
    """
    return db.query(models.Registration).filter(models.Registration.email == email).all()

def checkin_book(db: Session, email: str, book_id: int):
    """
    Checkin book
    Check and update the stock of books 
    Add the user-book in the Registrations table
    TODO: maybe check if the user with that email
    exists?
    """
    
    print(1)
    updated_book = update_book_stock(db, book_id, -1)
    user = get_user(db, email)
    try:
        registration = models.Registration(email=user.email, book_id=updated_book.id)
        db.add(registration)
        db.commit()
        db.refresh(registration)
    except Exception as e:
        print(e)
    return {"Success": f"Book {book_id} was checked in, {updated_book.stock} remaining."}


def checkout_book(db: Session, email: str, book_id: int):
    """
    Checkout book
    Update the stock of books and add the 
    checkout date in the registrations table
    """
    updated_book = update_book_stock(db, book_id, 1)
    user = get_user(db, email)
    try:
        registration = db.query(models.Registration).filter(models.Registration.email == user.email, models.Registration.book_id == updated_book.id).first()
        registration.checkout = datetime.datetime.utcnow()
        db.add(registration)
        db.commit()
        db.refresh(registration)
    except Exception as e:
        print(e)
    return {"Success": f"Book {book_id} was checked out, {updated_book.stock} remaining."}