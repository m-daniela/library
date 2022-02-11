from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# will change this later
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost:5432/library"

# create the db interface and session
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# get the base model 
Base = declarative_base()