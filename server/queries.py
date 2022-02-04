from xml.dom import NotFoundErr
from sqlalchemy.orm import Session
import datetime

import models, schemas, exception


# users

def get_user(db: Session, email):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> schemas.UserBase:
    """
    Add a new user
    """
    new_user = models.User(email=user.email, password=user.password, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def check_user(db: Session, user: schemas.UserCreate):
    """
    Check if the user is an admin or a normal user
    If an admin, return True, False otherwise
    """
    found_user = db.query(models.User).filter(models.User.email == user.email, models.User.password == user.password, models.User.role == user.role).first()

    if found_user is not None:
        print(found_user)
        if found_user.role == "admin":
            return True
        return False
    else:
        raise exception.CustomError("The email or password is wrong. Try again.")


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


def checkin_book(db: Session, email: str, book_id: int):
    """
    Checkin book
    Check and update the stock of books 
    Add the user-book in the Registrations table
    TODO: maybe check if the user with that email
    exists?
    """
    
    updated_book = update_book_stock(db, book_id, -1)
    user = get_user(db, email)
    try:
        # add the users in the registration table
        users = updated_book.users
        users.append(user)
        updated_book.users = users
        db.add(updated_book)
        db.commit()
        # db.refresh(registration)
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
    # try:
    #     users = updated_book.users
    #     users.append(user)
    #     updated_book.users = users
    #     # registration = models.registration(email=email, book_id=book_id)
    #     db.add(updated_book)
    #     db.commit()
    #     # db.refresh(registration)
    # except Exception as e:
    #     print(e)
    return {"Success": f"Book {book_id} was checked out, {updated_book.stock} remaining."}