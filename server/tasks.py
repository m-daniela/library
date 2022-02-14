from celery import Celery
import smtplib
from email.mime.text import MIMEText
from settings import settings


# setup the Celery 
celery_app = Celery("tasks", broker=settings.amqp)


# email
port = settings.smtp_port
server = settings.smtp_host
sender = settings.contact_email

# tasks to handle the emails

@celery_app.task
def send_email(email: str):
    """
    Send a registration email when a new user is added
    TODO: the email is sent to a local smtp server, add config
    for real email 
    """
    contents = f"Your account has been registered in The Library with the address {email}."

    message = MIMEText(contents)
    message["Subject"] = "Successful registration"
    message["From"] = sender
    message["To"] = email


    with smtplib.SMTP(server, port) as smtp_email:
        smtp_email.sendmail(sender, email, message.as_string())

    
@celery_app.task
def return_book_email(email: str, title: str):
    """
    Send a registration email when a new user is added
    """
    contents = f"Please return the book with title {title}."

    message = MIMEText(contents)
    message["Subject"] = "Book return notice"
    message["From"] = sender
    message["To"] = email
    
    with smtplib.SMTP(server, port) as smtp_email:
        smtp_email.sendmail(sender, email, message.as_string())
