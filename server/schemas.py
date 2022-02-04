from pydantic import BaseModel
from datetime import datetime

# user model
# model that will be shown
class UserBase(BaseModel):
    email: str

# login model
class UserLogin(UserBase):
    password: str

# model that will be added to the db
class UserCreate(UserLogin):
    role: str
    class Config:
        orm_mode = True


# book model

class Book(BaseModel):
    cover: str
    title: str
    description: str
    stock: int
    class Config:
        orm_mode = True


# registration model

class RegistrationBase(BaseModel):
    email: str
    book_id: int

class Registration(RegistrationBase):
    checkin: datetime
    checkout: datetime

    class Config:
        orm_mode = True


