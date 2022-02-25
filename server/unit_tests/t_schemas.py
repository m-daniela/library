from schemas import BookSchema, UserSchema
from .t_constants import *

def get_test_user_schema():
    return UserSchema().dump({"email": t_email, "password": t_password, "role": t_role_user})

def get_test_wrong_user():
    return UserSchema().dump({"email": t_wrong_email, "password": t_password, "role": t_role_user})

def get_test_new_user():
    return UserSchema().dump({"email": t_new_email, "password": t_password, "role": t_role_user})


def get_test_book():
    return BookSchema().dump({"title": t_book_title, "description": t_book_description, "stock": t_book_stock, "cover": t_book_cover})

def get_test_book_no_stock():
    return BookSchema().dump({"title": t_book_title, "description": t_book_description, "stock": 0, "cover": t_book_cover})