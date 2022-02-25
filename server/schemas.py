from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field, fields
from models import User, Book, Registration
from connection import db

class BookSchema(SQLAlchemySchema):
    class Meta:
        model=Book
        load_instance=True
    
    id = auto_field()
    title = auto_field()
    description = auto_field()
    cover = auto_field()
    stock = auto_field()



class RegistrationSchema(SQLAlchemySchema):

    class Meta:
        model=Registration
        load_instance=True

    email = auto_field()
    book_id = auto_field()
    checkin = auto_field()
    checkout = auto_field()
    book = fields.Nested(BookSchema)



class UserSchema(SQLAlchemySchema):
    class Meta:
        model=User
        load_instance=True
        sqla_session=db

    email = auto_field()
    password = auto_field()
    role = auto_field()
    books = fields.Nested(RegistrationSchema, many=True, only=("checkin", "checkout", "book"))





