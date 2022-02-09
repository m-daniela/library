from fastapi import Depends, FastAPI, Body
from sqlalchemy.orm import Session
import connection, queries
from fastapi.middleware.cors import CORSMiddleware
from schemas import ResponseModelSchema, UserLoginSchema, UserCreateSchema, BookSchema, RegistrationBaseSchema
from exception import CustomError

# TODO: better authentication

app = FastAPI()

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


connection.Base.metadata.create_all(bind=connection.engine)

# get the database session
def get_database():
    db = connection.SessionLocal()
    try: 
        yield db
    finally:
        db.close()



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