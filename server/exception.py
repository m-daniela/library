from flask import abort

class CustomError(Exception):
    pass

def CustomNotFoundError(message):
    raise abort(404, message)