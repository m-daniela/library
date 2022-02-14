from typing import Optional
from fastapi import BackgroundTasks, Depends, FastAPI, Body, HTTPException, Query, Security
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, SecurityScopes
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt

import connection, queries
from schemas import ResponseModelSchema, TokenDataSchema, UserLoginSchema, UserCreateSchema, BookSchema, RegistrationBaseSchema
from exception import CustomError, custom_unauthorized_exception
from authentication import secret, algorithm, authenticate_user, create_access_token
# from background_tasks.emails import return_book_email, send_email
from tasks import send_email, return_book_email
# import tasks

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
# add scopes for admin users:
# register, add book

auth_scheme = OAuth2PasswordBearer(
    tokenUrl="token", 
    scopes={"register": "Add a new user", "book": "Add a new book"}
)


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

# get the currently authenticated user

def current_user(scopes: SecurityScopes, db: Session = Depends(get_database), token: str = Depends(auth_scheme)):
    credentials_validation = "An error occurred. Please login again"
    permissions_validation = "You do not have permission to perform this action"

    # check if there are any scopes added
    # and add them to the bearer string
    if scopes.scopes:
        auth = f"Bearer scope={scopes.scope_str}"
    else:
        auth = "Bearer"

    try:
        # get the data from the payload 
        payload = jwt.decode(token, secret, algorithms=[algorithm])
        username = payload.get("sub")

        if not username:
            raise custom_unauthorized_exception(credentials_validation, auth)

        token_scopes = payload.get("scopes", [])
        token_data = TokenDataSchema(scopes=token_scopes, username=username)

    except JWTError:
        raise custom_unauthorized_exception(credentials_validation, auth)

    user = queries.get_user(db, username)
    
    for scope in scopes.scopes:
        if scope not in token_data.scopes:
            raise custom_unauthorized_exception(permissions_validation, auth)

    return user

# add the scopes as security dependencies for admin users
def admin_user(user: UserLoginSchema = Security(current_user, scopes=["register", "book"])):
    return

# no scopes needed for normal users
def normal_user(user: UserLoginSchema = Security(current_user)):
    return


@app.post("/token")
def login(db: Session = Depends(get_database), form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Check the user and if it is in the db, return a token
    """
    if form_data:
        username = form_data.username
        password = form_data.password

        user = authenticate_user(db, UserLoginSchema(email=username, password=password))

        if user:
            data = {
                "sub": user.email, 
                "role": user.role
            }
            # check if the user is an admin and give 
            # the corresponding scopes
            if user.role == "admin":
                data.update({"scopes": ["register", "book"]})

            access_token = create_access_token(data=data)

            return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Incorrect username or password")


@app.post("/change-password", dependencies=[Depends(normal_user)])
def change_password(user: UserLoginSchema, new_password: str = Body(..., embed=True), db: Session = Depends(get_database)):
    """
    Change the password
    TODO: change response
    """
    user = authenticate_user(db, UserLoginSchema(email=user.email, password=user.password))

    if user:
        queries.change_password(db, user, new_password)
        data = {
            "sub": user.email, 
            "role": user.role
        }
        # check if the user is an admin and give 
        # the corresponding scopes
        if user.role == "admin":
            data.update({"scopes": ["register", "book"]})

        access_token = create_access_token(data=data)

        return {"access_token": access_token, "token_type": "bearer", "message": "Password changed successfully"}
    raise HTTPException(status_code=400, detail="Incorrect username or password")


@app.get("/books", dependencies=[Depends(normal_user)])
def get_books(q: Optional[str] = Query(None), order: Optional[str] = Query(None), sorting: Optional[str] = Query(None),  db: Session = Depends(get_database)):
    """
    Get the list of books
    If a query string is provided, return the books based on that query
    """
    try:
        books = queries.get_books(db, q, order, sorting)
        return ResponseModelSchema(data=books)
    except Exception as e:
        return ResponseModelSchema(message="An error occurred while fetching the books, try again later")


@app.post("/book", dependencies=[Security(admin_user, scopes=["book"])])
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
        return ResponseModelSchema(message="An error occurred while adding the book, try again later")
        


@app.post("/register", dependencies=[Security(admin_user, scopes=["register"])])
def add_user(user: UserCreateSchema, db: Session = Depends(get_database)):
    """
    Add a new user
    Only the admin is allowed to do this operation
    """
    try:
        queries.create_user(db, user)
        # add a background task which sends an email to the address
        # background_tasks.add_task(send_email, user.email)
        # use delay directly since you want the email to be sent immediately
        send_email.delay(user.email)

        return ResponseModelSchema(message="User created successfully")
    except Exception as e:
        return ResponseModelSchema(message="This user already exists")
    


@app.post("/registrations", dependencies=[Depends(normal_user)])
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



@app.post("/raport", dependencies=[Depends(normal_user)])
def get_registrations(email: str = Body(..., embed=True), db: Session = Depends(get_database)):
    """
    Get a raport with the list of registrations 
    for the user, in the last week
    """
    
    try:
        registrations = queries.get_raport(db, email)
        return registrations
    except CustomError as e:
        return ResponseModelSchema(message=str(e))



@app.post("/checkin", dependencies=[Depends(normal_user)])
def checkin(registration: RegistrationBaseSchema, db: Session = Depends(get_database)):
    """
    Book checkin
    """
    try:
        added_registration = queries.checkin(db, registration.email, registration.book_id)
        book = added_registration.get("book")

        # create a background task to send an email with a checkout notice
        # background_tasks.add_task(return_book_email, registration.email, book.title)
        checkout_notice = 60
        # using apply_async to add a delay (the countdown) with the time after the task 
        # should run
        return_book_email.apply_async(args=[registration.email, book.title], countdown=checkout_notice)

        return ResponseModelSchema(message="Checkin successful", data=added_registration)
    except CustomError as e:
        return ResponseModelSchema(message=str(e))
        

@app.put("/checkout", dependencies=[Depends(normal_user)])
def checkout(registration: RegistrationBaseSchema, db: Session = Depends(get_database)):
    """
    Book checkout
    """
    try:
        updated_registration = queries.checkout(db, registration.email, registration.book_id)
        return ResponseModelSchema(message="Checkout successful", data=updated_registration)
    except CustomError as e:
        return ResponseModelSchema(message=str(e))