from sqlalchemy import CheckConstraint, Column, ForeignKey, Integer, String, DateTime, Table, null
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
    checkin = Column(DateTime, default=lambda: datetime.datetime.now(tz=datetime.timezone.utc), nullable=False)
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

    def __repr__(self) -> str:
        return f"{self.email}, {self.role}"


# associattion table for books and tags
# no need to create a model since you'll 
# only have the ids
book_tags = Table(
    "book_tags", 
    connection.Base.metadata, 
    Column("book_id", ForeignKey("books.id"), primary_key=True, nullable=True),
    Column("tag_id", ForeignKey("tags.id"), primary_key=True, nullable=True)
)


class Book(connection.Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    cover = Column(String)
    stock = Column(Integer, CheckConstraint("stock >= 0"), nullable=False)
    users = relationship(
        "Registration", 
        back_populates="book",
    )

    tags = relationship(
        "Tag", 
        back_populates="books",
        secondary=book_tags,
        lazy="subquery"
    )

    def __repr__(self) -> str:
        return f"{self.id}, {self.title}, {self.description}, {self.cover}, {self.stock}"



class Tag(connection.Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    genre = Column(String, nullable=False)
    # book_id = Column(ForeignKey("books.id"))

    books = relationship(
        "Book", 
        back_populates="tags", 
        secondary=book_tags    
    )

    def __repr__(self) -> str:
        return f"{self.id}, {self.genre}, {self.book_id}"




class Room(connection.Base):
    __tablename__ = "rooms"

    room_name = Column(String, primary_key=True, index=True)

    messages = relationship(
        "Message", 
        back_populates="room", 
        lazy="subquery"
    )

    def __repr__(self) -> str:
        return f"{self.room_name}, {self.messages}"


class Message(connection.Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    text = Column(String, nullable=False)
    room_name = Column(ForeignKey("rooms.room_name"))
    sender = Column(String, nullable=False)
    receiver = Column(String, nullable=False)

    room = relationship("Room", back_populates="messages")

    def __repr__(self) -> str:
        return f"{self.id}, {self.text}, sent by {self.sender}, to {self.receiver}"



