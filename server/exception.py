
from fastapi import HTTPException, status

class CustomError(Exception):
    pass

def custom_unauthorized_exception(detail, headers):
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": headers},
    )

def custom_not_found_exception(detail):
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, 
        detail=detail
    )