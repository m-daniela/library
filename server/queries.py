import datetime
from models import User, Book, Registration 



def get_books():
    """
    Get the list of books
    Will add pagination later
    """
    return Book.query.all()


