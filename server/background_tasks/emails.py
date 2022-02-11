import smtplib

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
    message = f"Your account has been registered in The Library with the address {email}."
    contents = f"to: {email}\nfrom: The Library\n\n{message}"

    with smtplib.SMTP(server, port) as smtp_email:
        smtp_email.sendmail(sender, email, contents)

    

