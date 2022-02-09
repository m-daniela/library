from typing import Optional, Union, Any
from pydantic import BaseModel, Field
from datetime import datetime

# user model
# model that will be shown
class UserBaseSchema(BaseModel):
    email: str

# login model
class UserLoginSchema(UserBaseSchema):
    password: str

# model that will be added to the db
class UserCreateSchema(UserLoginSchema):
    role: str
    class Config:
        orm_mode = True


# book model

class BookSchema(BaseModel):
    cover: str
    title: str
    description: str
    stock: int
    class Config:
        orm_mode = True


# registration model

class RegistrationBaseSchema(BaseModel):
    email: str
    book_id: int

class RegistrationSchema(RegistrationBaseSchema):
    checkin: datetime
    checkout: Optional[datetime]

    class Config:
        orm_mode = True



# response model

class ResponseModelSchema(BaseModel):
    message: Optional[str]
    data: Optional[Union[dict, list, BookSchema, RegistrationSchema]]