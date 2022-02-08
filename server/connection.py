from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# will change this later
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost:5432/library"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

# db session object
db = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

# declare the base class for the mappings
Base = declarative_base()
Base.query = db.query_property()