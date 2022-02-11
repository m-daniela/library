import smtplib
from email.mime.text import MIMEText
import time

from settings import settings

port = settings.smtp_port
server = settings.smtp_host
sender = settings.contact_email


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

    

def return_book_email(email: str, title: str):
    """
    Send a registration email when a new user is added
    TODO: change this so it doesn't use sleep
    """
    contents = f"Please return the book with title {title}."

    message = MIMEText(contents)
    message["Subject"] = "Book return notice"
    message["From"] = sender
    message["To"] = email
    
    # send notice email after 5 minutes
    time.sleep(5 * 60)
    # time.sleep(5)

    with smtplib.SMTP(server, port) as smtp_email:
        smtp_email.sendmail(sender, email, message.as_string())

    


