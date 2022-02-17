from operator import index
from sqlalchemy import CheckConstraint, Column, ForeignKey, Integer, String, DateTime, null
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

   


    # sent_messages = relationship(
    #     "Message", 
    #     back_populates="sender", 
    #     foreign_keys=[Message.sender_email]
    # )

    # received_messages = relationship(
    #     "Message", 
    #     back_populates="receiver",
    #     foreign_keys=[Message.receiver_email]
    # )

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



class Room(connection.Base):
    __tablename__ = "rooms"

    room_name = Column(String, primary_key=True, index=True)

    messages = relationship(
        "Message", 
        back_populates="room"
    )

class Message(connection.Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    text = Column(String, nullable=False)
    room_name = Column(ForeignKey("rooms.room_name"))
    # room = Column(String, nullable=False)
    sender = Column(String, nullable=False)
    receiver = Column(String, nullable=False)

    room = relationship("Room", back_populates="messages")


    # email = Column(ForeignKey("users.email"))
    # user = relationship("User", back_populates="messages")

    # sender_email = Column(String, ForeignKey("users.email"))
    # sender = relationship("User", foreign_keys=[sender_email], back_populates="sent_messages")

    # receiver_email = Column(String, ForeignKey("users.email"))
    # receiver = relationship("User", foreign_keys=[receiver_email], back_populates="received_messages")


    def __str__(self) -> str:
        return f"{self.id}, {self.text}, sent by {self.sender}"



