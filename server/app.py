from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import connection, queries
from schemas import UserSchema, BookSchema, RegistrationSchema


# TODO: better authentication

origins = [
    "http://localhost:3000",
]

app = Flask(__name__)
cors = CORS(app)
# will change this
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:password@localhost:5432/library"

connection.Base.metadata.create_all(bind=connection.engine)


# login the user if the provided email 
# and password are correct
@app.route("/login", methods=["POST"])
def login():
    pass


# get the list of books
@app.route("/books", methods=["GET"])
def get_books():
    books = queries.get_books()
    book_schema = BookSchema(many=True)
    result = book_schema.dump(books)
    return jsonify(result)

# add a new book
@app.route("/book", methods=["POST"])
def add_book():
    pass

# add a new user
@app.route("/register", methods=["POST"])
def add_user():
    pass


# Get the list of registrations
@app.route("/registrations/<string:email>", methods=["GET"])
def get_registrations(email):
    pass

# book checkin
@app.route("/checkin", methods=["POST"])
def checkin():
    pass

# book checkout
@app.route("/checkout", methods=["PUT"])
def checkout():
    pass

@app.teardown_appcontext
def shutdown_session(exception=None):
    connection.db.remove()

