from crypt import methods
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

# TODO: better authentication

origins = [
    "http://localhost:3000",
]

app = Flask(__name__)
cors = CORS(app)

# login the user if the provided email 
# and password are correct
@app.route("/login", methods=["POST"])
def login():
    pass


# get the list of books
@app.route("/books", methods=["GET"])
def get_books():
    pass

# add a new book
@app.route("/book", methods=["POST"])
def add_book():
    pass

# add a new user
@app.route("/register", methods=["POST"])
def add_user():
    pass


# Get the list of registrations
@app.route("/registrations/<email:str>", methods=["GET"])
def get_registrations(email):
    pass

# book checkin
@app.post("/checkin")
def checkin():
    pass

# book checkout
@app.put("/checkout")
def checkout():
    pass

# connection.Base.metadata.create_all(bind=connection.engine)

# # get the database session
# def get_database():
#     db = connection.SessionLocal()
#     try: 
#         yield db
#     finally:
#         db.close()


# # Endpoints

# # get /books
# # get /registrations
# # post /register
# # post /checkin
# # put /checkout
# # get /your_books


# @app.post("/login")
# def login(user: schemas.UserLogin, db: Session = Depends(get_database)):
#     """
#     Login and check if the user is an admin or not
#     Based on this, the user will be redirected
#     TODO: change to form? 
#     """
#     try:
#         result = queries.check_user(db, user)
#         return result
#     except Exception as e:
#         return {"Error": e}


# @app.get("/books")
# def get_books(db: Session = Depends(get_database)):
#     """
#     Get the list of books
#     """
#     try:
#         books = queries.get_books(db)
#         return books
#     except Exception as e:
#         return {"Error": e}


# @app.post("/book")
# def add_book(book: schemas.Book, db: Session = Depends(get_database)):
#     """
#     Add a new book
#     Only an admin is allowed to perform this operation
#     """
#     try:
#         result = queries.add_book(db, book)
#         return {"message": f"Book with title {result.title} was added"}
#     except Exception as e:
#         return {"message": e}
        


# @app.post("/register")
# def add_user(user: schemas.UserCreate, db: Session = Depends(get_database)):
#     """
#     Add a new user
#     Only the admin is allowed to do this operation
#     """
#     try:
#         user = queries.create_user(db, user)
#         result = {
#             "email": user.email, 
#             "role": user.role, 
#             "message": f"{user.email} successfully added"
#         }
#         return result
#     except Exception as e:
#         print(e)
#         return {"message": "This user already exists"}
    



# @app.get("/registrations/{email}")
# def get_registrations(email: str, db: Session = Depends(get_database)):
#     """
#     Get the list of registrations
#     TODO: registrations for a given user...
#     """
#     try:
#         print(email)
#         registrations = queries.get_registrations(db, email)
#         print(registrations)
#         return registrations
#     except Exception as e:
#         return {"Error": e}


# @app.post("/checkin")
# def checkin(registration: schemas.RegistrationBase, db: Session = Depends(get_database)):
#     """
#     Book checkin
#     The current user sends a request with the email and 
#     the id of the book they want 
#     """
#     try:
#         result = queries.checkin_book(db, registration.email, registration.book_id)
#         return result
#     except Exception as e:
#         return {"Error": e}
        

# @app.put("/checkout")
# def checkout(registration: schemas.RegistrationBase, db: Session = Depends(get_database)):
#     """
#     Book checkout
#     """
#     try:
#         result = queries.checkout_book(db, registration.email, registration.book_id)
#         return result
#     except Exception as e:
#         return {"Error": e}