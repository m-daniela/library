from werkzeug.exceptions import HTTPException
import pytest
from mock import patch

import queries
from . import t_schemas
from . import t_models

# will move these
tested_user = t_models.get_test_user()
wrong_user = t_schemas.get_test_wrong_user()
tested_login = {
    "email": tested_user.email,
    "role": tested_user.role
}

new_user = t_models.get_test_new_user()
new_user_schema = t_schemas.get_test_new_user()

@patch("queries.get_user", return_value=tested_user)
def test_get_user_exists(mock):
    find_user = t_schemas.get_test_user_schema()
    email = find_user.get("email")

    # call the mocked get_user function
    # returns the model passed as return value
    result = queries.get_user(email)

    # the mock function is called once with the 
    # given email
    mock.assert_called_once_with(email)
    assert result == tested_user


def test_get_user_doesnt_exist():
    email = wrong_user.get("email")
    
    with pytest.raises(HTTPException):
        queries.get_user(email)


@patch("queries.login_user", return_value=tested_login)
def test_login_user_exists(mock):
    result = queries.login_user(tested_user)

    mock.assert_called_once_with(tested_user)
    assert result == tested_login
    

def test_login_user_doesnt_exist():
    with pytest.raises(HTTPException):
        queries.login_user(wrong_user)


@patch("queries.create_user", return_value=new_user)
def test_create_user(mock):
    result = queries.create_user(new_user_schema)

    mock.assert_called_once_with(new_user_schema)
    assert result == new_user


def test_create_user_exists():
    with pytest.raises(Exception):
        queries.create_user(tested_user)