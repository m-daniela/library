# The Library

Exercise app representing a library. 

There are two types of users:

- admins: can add new users and books, as well as borrow books
- users: can borrow and return books

When a user checks in a book, a new registration is created and updated on checkout. 

# Technologies

**Backend**: [FastAPI](https://github.com/m-daniela/library), [Flask](https://github.com/m-daniela/library/tree/flask), SQLAlchemy as ORM

**Database**: postgresql

**Frontend**: React

# Models

**User**

- email: string
- password: string
- role: string


**Book**

- id: int
- title: string
- cover: string
- description: string
- stock: int


**Registrations**

- email: string
- book_id: int
- checkin: date
- checkout: date

# Endpoints

- `POST /login` - login user
- `POST /register` - register user
- `POST /book` - add book
- `GET /books` - get the list of books
- `POST /checkin` - borrow book
- `PUT /checkout` - return book
- `GET /registrations` - get registrations for a given user
