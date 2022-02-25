from models import User, Book, Registration
from .t_constants import *

def get_test_user():
    return User(email=t_email, password=t_password, role=t_role_user)

def get_test_wrong_user():
    return User(email=t_wrong_email, password=t_password, role=t_role_user)

def get_test_new_user():
    return User(email=t_new_email, password=t_password, role=t_role_user)


def get_test_book():
    return Book(id=1, title=t_book_title, description=t_book_description, cover=t_book_cover, stock=t_book_stock)

def get_test_book_no_stock():
    return Book(id=2, title=t_book_title, description=t_book_description, cover=t_book_cover, stock=0)

def get_test_wrong_book():
    return Book(id=0, title=t_book_title, description=t_book_description, cover=t_book_cover, stock=t_book_stock)