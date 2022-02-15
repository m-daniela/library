from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import jwt

import queries
from schemas import UserLoginSchema
from settings import settings



# will change these too
# got the secret with openssl rand -hex 32
secret = settings.secret
algorithm = settings.hash_algorithm
token_expiration_minutes = settings.token_expiration

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
    # expire = datetime.utcnow() + timedelta(minutes=token_expiration_minutes)
    expire = datetime.now(tz=timezone.utc) + timedelta(minutes=token_expiration_minutes)
    data.update({"exp": expire})
    encoded_jwt = jwt.encode(data, secret, algorithm=algorithm)
    return encoded_jwt
    

