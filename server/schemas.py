from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from models import User, Book, Registration


class UserSchema(SQLAlchemySchema):
    class Meta:
        model=User

    email = auto_field()
    password = auto_field()
    role = auto_field()


class BookSchema(SQLAlchemySchema):
    class Meta:
        model=Book
    
    id = auto_field()
    title = auto_field()
    description = auto_field()
    cover = auto_field()
    stock = auto_field()


class RegistrationSchema(SQLAlchemySchema):
    class Meta:
        model=Registration

    email = auto_field()
    book_id = auto_field()
    checkin = auto_field()
    checkout = auto_field()
    book = auto_field()
    user = auto_field()


