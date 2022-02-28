import unit_tests.test_utils.constants as constants
from schemas import UserCreateSchema


def user_schema():
    return UserCreateSchema(email=constants.user_email, password=constants.user_password, role=constants.user_role)

def wrong_user_schema():
    return UserCreateSchema(email=constants.user_wrong_email, password=constants.user_password, role=constants.user_role)

