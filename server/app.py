from flask import Flask, jsonify, request
from flask_cors import CORS
import connection, queries
from schemas import UserSchema, BookSchema, RegistrationSchema
from exception import CustomError

app = Flask(__name__)
cors = CORS(app)

# create the tables
connection.Base.metadata.create_all(bind=connection.engine)


# login the user if the provided email 
# and password are correct
@app.route("/login", methods=["POST"])
def login():
    try: 
        data = request.get_json()
        user_schema = UserSchema()
        user = user_schema.dump(data)
        found_user = queries.login_user(user)
        if found_user is not None:
            return jsonify(user=found_user, message="Successful login")
        else:
            return jsonify(message="The username or password is incorrect")
    except Exception as e:
        return jsonify(message="An error occurred, try again later")


# get the list of books
@app.route("/books", methods=["GET"])
def get_books():
    try:
        books = queries.get_books()
        book_schema = BookSchema(many=True)
        result = book_schema.dump(books)
        return jsonify(result)
    except Exception as e:
        return jsonify(message="An error occurred while fetching the books, try again later")


# add a new book
@app.route("/book", methods=["POST"])
def add_book():
    try: 
        data = request.get_json()
        book_schema = BookSchema()
        book = book_schema.dump(data)
        added_book = queries.add_book(book)
        message =  f"Book with title {added_book.title} was added"
        return jsonify(message=message, book=book)
    except Exception as e:
        print(e)
        return jsonify(message="An error occurred while adding the book, try again later")


# add a new user
@app.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.get_json()

        user_schema = UserSchema()
        user = user_schema.dump(data)
        queries.create_user(user)

        return jsonify(message="User created successfully")
    except Exception:
        return jsonify(message="This user already exists")


# Get the list of registrations
@app.route("/registrations", methods=["POST"])
def get_registrations():
    try:
        data = request.get_json()
        email = data["email"]

        registrations = queries.get_registrations_for_user(email)

        # only the columns from the registrations are displayed 
        # in this way
        registration_schema = UserSchema(only=("email", "books"))
        json_registrations = registration_schema.dump(registrations)

        return jsonify(registrations=json_registrations)

    except CustomError as e:
        return jsonify(message=str(e))
    except Exception as e:
        return jsonify(message="An error occurred while fetching the registrations, try again later")

    

# book checkin
@app.route("/checkin", methods=["POST"])
def checkin():
    try:
        data = request.get_json()
        registration = queries.checkin(data["book_id"], data["email"])

        registration_schema = RegistrationSchema()
        json_registration = registration_schema.dump(registration)

        return jsonify(message="Checkin successful", registration=json_registration)

    except CustomError as e:
        return jsonify(message=str(e))
    except Exception as e:
        return jsonify(message="You have already checked in this book")


# book checkout
@app.route("/checkout", methods=["PUT"])
def checkout():
    try:
        data = request.get_json()
        registration = queries.checkout(data["book_id"], data["email"])

        registration_schema = RegistrationSchema()
        json_registration = registration_schema.dump(registration)

        return jsonify(message="Checkout successful", registration=json_registration)

    except CustomError as e:
        return jsonify(message=str(e))


# to remove the db session at the end of the 
# request and on shutdown
@app.teardown_appcontext
def shutdown_session(exception=None):
    connection.db.remove()

