import unit_tests.test_utils.constants as constants
from models import User

def user_model():
    return User(email=constants.user_email, password=constants.user_password, role=constants.user_role)


def wrong_user_model():
    return User(email=constants.user_wrong_email, password=constants.user_password, role=constants.user_role)


