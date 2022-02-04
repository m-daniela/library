from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
import connection, connection, schemas, queries


# TODO: better authentication

app = FastAPI()

connection.Base.metadata.create_all(bind=connection.engine)

# get the database session
def get_database():
    db = connection.SessionLocal()
    try: 
        yield db
    finally:
        db.close()


# Endpoints

# get /books
# get /registrations
# post /register
# post /checkin
# put /checkout
# get /your_books


@app.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_database)):
    """
    Login and check if the user is an admin or not
    Based on this, the user will be redirected 
    """
    try:
        result = queries.check_user(db, user)
        return {"Permissions": result}
    except Exception as e:
        return {"Error": e}


@app.get("/books")
def get_books(db: Session = Depends(get_database)):
    """
    Get the list of books
    """
    try:
        books = queries.get_books(db)
        return books
    except Exception as e:
        return {"Error": e}


@app.post("/book")
def add_book(book: schemas.Book, db: Session = Depends(get_database)):
    """
    Add a new book
    Only an admin is allowed to perform this operation
    """
    try:
        result = queries.add_book(db, book)
        return {"Success": f"Book with {result.id} and title {result.title} was added"}
    except Exception as e:
        return {"Error": e}
        


@app.post("/register")
def add_user(user: schemas.UserCreate, db: Session = Depends(get_database)):
    """
    Add a new user
    Only the admin is allowed to do this operation
    """
    try:
        result = queries.create_user(db, user)
        print(result)
        return result
    except Exception as e:
        return {"Error": e}



@app.get("/registrations/")
def get_registrations_for_user(db: Session = Depends(get_database)):
    """
    Get the list of registrations
    """
    try:
        registrations = queries.get_registrations(db)
        return registrations
    except Exception as e:
        return {"Error": e}


@app.post("/checkin")
def checkin(registration: schemas.RegistrationBase, db: Session = Depends(get_database)):
    """
    Book checkin
    The current user sends a request with the email and 
    the id of the book they want 
    """
    try:
        result = queries.checkin_book(db, registration.email, registration.book_id)
        return result
    except Exception as e:
        return {"Error": e}
        

@app.put("/checkout")
def checkout(registration: schemas.RegistrationBase, db: Session = Depends(get_database)):
    """
    Book checkout
    """
    try:
        result = queries.checkout_book(db, registration.email, registration.book_id)
        return result
    except Exception as e:
        return {"Error": e}