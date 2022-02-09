import datetime
from sqlalchemy.orm import Session

from schemas import UserCreateSchema, UserBaseSchema, UserLoginSchema, BookSchema
from models import User, Registration, Book
from exception import CustomError
from authentication import password_hash

# users

def get_user(db: Session, email):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise CustomError("The user does not exist")
    return user


def create_user(db: Session, user: UserCreateSchema) -> UserBaseSchema:
    """
    Add a new user
    """
    hashed_pass = password_hash(user.password)
    new_user = User(email=user.email, password=hashed_pass, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def login_user(db: Session, user: UserLoginSchema):
    """
    Login the user and return the email and permissions
    """
    found_user = db.query(User).filter(User.email == user.email, User.password == user.password).first()
    if found_user:
        found_user = {
            "email": found_user.email,
            "role": found_user.role,
        }
    return found_user


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
    return db.query(Book).all()


def get_book(db: Session, book_id: int):
    """
    Get the book with the given id
    """
    book = db.query(Book).get(book_id)
    if not book:
        raise CustomError("The book does not exist")
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
    Get all registrations
    TODO: the results are split in two objects
    """
    results = db.query(Registration, Book)\
        .filter(Registration.email == email, Registration.book_id == Book.id)\
        .all()
    # results = db.query(models.Registration).filter(models.Registration.email == email).join(models.Book).filter(models.Registration.book_id == models.Book.id).all()
    # for result in results:
    #     print(result)
    # results = db.query(models.Registration)\
    #     .join(models.Book)\
    #     .filter(models.Registration.email == email, models.Registration.book_id == models.Book.id)\
    #     .all()
    # results = []
    return results

def checkin(db: Session, email: str, book_id: int):
    """
    Register the given book for the user
    """
    user = get_user(db, email)
    book = get_book(db, book_id)
    update_book_stock(db, book, -1)

    registration = Registration(email=user.email, book_id=book.id)
    db.add(registration)
    db.commit()
    db.refresh(registration)

    return registration



def checkout(db: Session, email: str, book_id: int):
    """
    Checkout the book for the user
    """

    user = get_user(db, email)
    book = get_book(db, book_id)

    registration = db.query(Registration).filter(Registration.email == user.email, Registration.book_id == book.id).first()

    if not registration:
        raise CustomError("The registration does not exist")

    if not registration.checkout:
        update_book_stock(db, book, 1)
        registration.checkout = datetime.datetime.utcnow()
        db.commit()
        return registration
    else:
        raise CustomError("You have already checked out this book")
