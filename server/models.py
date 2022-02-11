from sqlalchemy import CheckConstraint, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
import datetime
import connection

# added eager** loading so that the list of books
# for a user is retrieved when asking for registrations
# without aditional joins
# user -> registration -> book

# using an actual table as an association table
class Registration(connection.Base):
    __tablename__ = "registrations"

    email = Column(ForeignKey("users.email", ondelete="cascade"), primary_key=True)
    book_id = Column(ForeignKey("books.id"), primary_key=True)
    checkin = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    checkout = Column(DateTime, default=None, nullable=True)

    user = relationship("User", back_populates="books")
    book = relationship("Book", back_populates="users", lazy="subquery")

    def __str__(self) -> str:
        return f"{self.email}, {self.book_id}, {self.checkin}, {self.checkout}"


class User(connection.Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=True)
    password = Column(String)
    role = Column(String, default="user")
    books = relationship(
        "Registration", 
        back_populates="user",
        lazy="subquery", 
        cascade="all, delete",
        passive_deletes=True
    )

    def __str__(self) -> str:
        return f"{self.email}, {self.role}"


class Book(connection.Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    cover = Column(String)
    stock = Column(Integer, CheckConstraint("stock > 0"), nullable=False)
    users = relationship(
        "Registration", 
        back_populates="book",
    )

    def __str__(self) -> str:
        return f"{self.id}, {self.title}, {self.description}, {self.cover}, {self.stock}"


