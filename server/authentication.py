from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt

import queries
from schemas import UserLoginSchema


# will change these too
# got the secret with openssl rand -hex 32
secret = "4fa246c8fcd8126b85aa1ada346262824209a9e779767af134fedb8e00c06cfc"
algorithm = "HS256"
token_expiration_minutes = 15

# create the hash context
# will be used to hash and verify the passwords
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# function to get the hash of the password
def password_hash(password):
    return password_context.hash(password)

# function to verify the password
def password_verification(password, hashed_password):
    return password_context.verify(password, hashed_password)

# authenticate the user
# check if the provided password is the same 
# as the one in the db
def authenticate_user(db, user: UserLoginSchema):
    found_user = queries.get_user(db, user.email)
    if not found_user:
        return False
    if not password_verification(user.password, found_user.password):
        return False
    return found_user

# data is a dictionary with data about the subject
# of the token
# https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/#technical-details-about-the-jwt-subject-sub
def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=token_expiration_minutes)
    data.update({"exp": expire})
    encoded_jwt = jwt.encode(data, secret, algorithm=algorithm)
    return encoded_jwt
    

