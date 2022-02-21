from typing import Any, List, Optional
from pydantic import BaseModel
from datetime import datetime

# user 

class UserBaseSchema(BaseModel):
    email: str

# user login data 

class UserLoginSchema(UserBaseSchema):
    password: str

# user data for the database

class UserCreateSchema(UserLoginSchema):
    role: str
    class Config:
        orm_mode = True


# book

class BookUpdateSchema(BaseModel):
    cover: str
    description: str
    stock: int
    tags: List[str]

class BookSchema(BookUpdateSchema):
    title: str
    class Config:
        orm_mode = True


# registration 

class RegistrationBaseSchema(BaseModel):
    email: str
    book_id: int

class RegistrationSchema(RegistrationBaseSchema):
    checkin: datetime
    checkout: Optional[datetime]

    class Config:
        orm_mode = True


# tag

class TagBaseSchema(BaseModel):
    name: str

class TagSchema(TagBaseSchema):
    id: int

    class Config:
        orm_mode = True

# message

class MessageSchema(BaseModel):
    id: Optional[str] = None
    text: str
    sender: str
    receiver: str
    room_name: str

    class Config:
        orm_mode = True

# room

class RoomSchema(BaseModel):
    room_name: str

    class Config:
        orm_mode = True

# token

class TokenDataSchema(BaseModel):
    username: Optional[str] = None
    scopes: List[str] = []

class TokenSchema(BaseModel):
    access_token: str
    token_type: str

# response 

class ResponseModelSchema(BaseModel):
    message: Optional[str]
    data: Optional[Any]


# filter builder

class FilterBuilder:
    def __init__(self, query) -> None:
        self.__query = query

    def set_query(self, query):
        self.__query = query

    def add_filter(self, filter_criteria):
        query = self.__query.filter(filter_criteria)
        self.set_query(query)

    def add_order(self, order_criteria, sorting = None):
        if sorting == "ASC":
            query = self.__query.order_by(order_criteria)
        else:
            query = self.__query.order_by(order_criteria.desc())
        self.set_query(query)
        
    def get_query(self):
        return self.__query

    def __repr__(self):
        return str(self.__query)