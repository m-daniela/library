# The Library

Exercise app representing a library. 

## Authentication

The users need to authenticate using a JWT token. They have scopes depending on the role and are allowed to do certain operations. 

## Functionalities

There are three types of users:

- admins
- users
- contact

Based on the role, they are allowed to do the following:

**Admins**

- borrow and return books
- change password
- generate checkin report for the last week
- search for books and registrations
- use the chat
- add book
- update book
- register user
- display registrations for a user
- delete registration, if checked out


**Users**

- borrow and return books
- change password
- generate checkin report for the last week
- search for books and registrations
- use the chat

**Contact**
 
- change password
- use the chat (it has a different interface and all the previous conversations and messages are displayed)

## Filtering

The books and registrations can be searched by title, sorted or filtered. 

**Book**

- order by:
  - title
  - stock
- filter by:
  - availability

**Registration**

- order by:
  - title
  - checkin
  - checkout
- filter by:
  - checkout

## Notifications

Email notifications are sent:

- when a new user is registered
- 5 minutes after the user checked in a book, the email being a return notice for that book
- when a registration was deleted

## Chat

The application provides a contact chat. The normal user sees a simple chat window and the contact user has all the previous messages and conversations. 

The communication takes place through sockets, but the messages are saved in the database as well. 

## Autocomplete

When an admin user 

# Technologies

**Backend**: [FastAPI](https://github.com/m-daniela/library), [Flask](https://github.com/m-daniela/library/tree/flask), SQLAlchemy, celery

**Database**: postgresql

**Frontend**: React

**Sockets**: socket.io

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

**Tags**

- id: int
- name: string

**Book_Tags**

- book_id: int
- tag_id: int

**Rooms**

- room_name: string
  
**Messages**

- id: int
- text: string
- room_name: string
- sender: string
- receiver: string


# Endpoints

- `POST /token` - login user and get access token
- `POST /change-password` change password
- `POST /register` - register user
- `POST /book` - add book
- `GET /books` - get the list of books
- `PUT /book/{book_id}` - update book
- `POST /checkin` - borrow book
- `PUT /checkout` - return book
- `POST /registrations` - get registrations for a given user, using post to be able to send body data
- `POST /report` - borrowed books report
- `DELETE /delete-registration` - delete registration
- `GET /chats` - get all chats
- `POST /messages` - get messages for a room
- `POST /message` - add message
- `GET /tags` - search for tags
