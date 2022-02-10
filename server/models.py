from tokenize import String
from xmlrpc.client import DateTime
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
import datetime

import connection

# using an actual table as an association table
class Registration(connection.Base):
    __tablename__ = "registrations"

    email = Column(ForeignKey("users.email"), primary_key=True)
    book_id = Column(ForeignKey("books.id"), primary_key=True)
    checkin = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    checkout = Column(DateTime, default=None, nullable=True)

    user = relationship("User", back_populates="books")
    book = relationship("Book", back_populates="users")



class User(connection.Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=True)
    password = Column(String)
    role = Column(String, default="user")
    books = relationship(
        "Registration", 
        back_populates="user"
    )


class Book(connection.Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    cover = Column(String)
    stock = Column(Integer, nullable=False)
    users = relationship(
        "Registration", 
        back_populates="book"
    )



