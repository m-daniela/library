from xmlrpc.client import DateTime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table, DateTime
from sqlalchemy.orm import relationship
import datetime

import connection

registration = Table(
    "registrations", 
    connection.Base.metadata, 
    Column("email", ForeignKey("users.email"), primary_key=True), 
    Column("book_id", ForeignKey("books.id"), primary_key=True), 
    Column("checkin", DateTime, default=datetime.datetime.utcnow, nullable=False),
    Column("checkout", DateTime, default=None, nullable=True),
)


class User(connection.Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=True)
    password = Column(String)
    role = Column(String)
    books = relationship(
        "Book", 
        secondary=registration, 
        back_populates="users"
    )


class Book(connection.Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    cover = Column(String)
    stock = Column(Integer, nullable=False,)
    users = relationship(
        "User", 
        secondary=registration,
        back_populates="books"
    )



