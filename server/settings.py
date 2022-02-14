from pydantic import BaseSettings

# .env variables 

class Settings(BaseSettings):
    db_connection: str
    secret: str
    hash_algorithm: str
    token_expiration: int
    smtp_port: int
    smtp_host: str
    contact_email: str
    amqp: str

    class Config:
        env_file = ".env"


# make the env variables accessible
settings = Settings()