
from fastapi import HTTPException, status

class CustomError(Exception):
    pass

def CustomHTTPException(detail, headers):
    return HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail=detail,
    headers={"WWW-Authenticate": headers},
)