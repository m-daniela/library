from typing import List, Optional, Union
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

class BookSchema(BaseModel):
    cover: str
    title: str
    description: str
    stock: int
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
    data: Optional[Union[dict, list, BookSchema, RegistrationSchema]]