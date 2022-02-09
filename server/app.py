from fastapi import Depends, FastAPI, Body, Request, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt

import connection, queries
from schemas import ResponseModelSchema, UserLoginSchema, UserCreateSchema, BookSchema, RegistrationBaseSchema
from exception import CustomError
from authentication import secret, algorithm, authenticate_user, create_access_token

# add middleware so you can use the global dependencies 
# that will be passed to the instance
app = FastAPI()


connection.Base.metadata.create_all(bind=connection.engine)

# get the database session
def get_database():
    db = connection.SessionLocal()
    try: 
        yield db
    finally:
        db.close()


# authentication

auth_scheme = OAuth2PasswordBearer(tokenUrl="token")


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def current_user(db: Session = Depends(get_database), token: str = Depends(auth_scheme)):
    # print(token)
    # return queries.get_user(db, token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, secret, algorithms=[algorithm])
        username = payload.get("sub")
        if not username:
            raise credentials_exception
        token_data = username
    except JWTError:
        raise credentials_exception
    user = queries.get_user(db, username)
    return user


@app.post("/token")
def login(db: Session = Depends(get_database), form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Check the user and if it is in the db, return a token
    """
    if form_data:
        username = form_data.username
        password = form_data.password
        user = authenticate_user(db, UserLoginSchema(email=username, password=password))
        print(user)
        if user:
            access_token = create_access_token(data={"sub": user.email})
            return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Incorrect username or password")


# @app.post("/token")
# def login(db: Session = Depends(get_database), form_data: OAuth2PasswordRequestForm = Depends()):
#     """
#     Check the user and if it is in the db, return a token
#     """
#     if form_data:
#         username = form_data.username
#         password = form_data.password
#         # get the user from the db
#         user = queries.get_user(db, username)
#         # check the password
#         if password == user.password:
#             # return the token if found
#             return {"access_token": username, "token_type": "bearer"}
#     raise HTTPException(status_code=400, detail="Incorrect username or password")


# @app.get("/user-token")
# def user_token(user: UserCreateSchema = Depends(authenticate_user)):
#     return user

@app.get("/user-token")
def user_token(user: UserCreateSchema = Depends(current_user)):
    return user


@app.post("/login")
def login(user: UserLoginSchema, db: Session = Depends(get_database)):
    """
    Login and check if the user is an admin or not
    Based on this, the user will be redirected
    """
    try:
        user = queries.login_user(db, user)

        if user:
            return ResponseModelSchema(data=user, message="Successful login")
        else:
            return ResponseModelSchema(message="The username or password is incorrect")
    except Exception as e:
        return ResponseModelSchema(message="An error occurred, try again later")


@app.get("/books")
def get_books(db: Session = Depends(get_database)):
    """
    Get the list of books
    """
    try:
        books = queries.get_books(db)
        return ResponseModelSchema(data=books)
    except Exception as e:
        return ResponseModelSchema(message="An error occurred while fetching the books, try again later")


@app.post("/book")
def add_book(book: BookSchema, db: Session = Depends(get_database)):
    """
    Add a new book
    Only an admin is allowed to perform this operation
    """
    try:
        added_book = queries.add_book(db, book)
        message =  f"Book with title {added_book.title} was added"
        return ResponseModelSchema(message=message, data=added_book)
    except Exception as e:
        print(e)
        return ResponseModelSchema(message="An error occurred while adding the book, try again later")
        


@app.post("/register")
def add_user(user: UserCreateSchema, db: Session = Depends(get_database)):
    """
    Add a new user
    Only the admin is allowed to do this operation
    """
    try:
        queries.create_user(db, user)
        return ResponseModelSchema(message="User created successfully")
    except Exception as e:
        return ResponseModelSchema(message="This user already exists")
    


@app.post("/registrations")
def get_registrations(email: str = Body(..., embed=True), db: Session = Depends(get_database)):
    """
    Get the list of registrations
    TODO: change response model
    """
    try:
        registrations = queries.get_registrations(db, email)
        return registrations
    except CustomError as e:
        return ResponseModelSchema(message=str(e))
    except Exception as e:
        return ResponseModelSchema(message="An error occurred while fetching the registrations, try again later")



@app.post("/checkin")
def checkin(registration: RegistrationBaseSchema, db: Session = Depends(get_database)):
    """
    Book checkin
    """
    try:
        added_registration = queries.checkin(db, registration.email, registration.book_id)
        return ResponseModelSchema(message="Checkin successful", data=added_registration)
    except CustomError as e:
        return ResponseModelSchema(message=str(e))
    except Exception as e:
        return ResponseModelSchema(message="You have already checked in this book")
        

@app.put("/checkout")
def checkout(registration: RegistrationBaseSchema, db: Session = Depends(get_database)):
    """
    Book checkout
    """
    try:
        updated_registration = queries.checkout(db, registration.email, registration.book_id)
        return ResponseModelSchema(message="Checkout successful", registration=updated_registration)
    except CustomError as e:
        return ResponseModelSchema(message=str(e))