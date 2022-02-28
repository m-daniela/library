from fastapi import HTTPException, status
import pytest
from mock import patch

import queries
import unit_tests.test_utils.constants as constants
import unit_tests.test_utils.test_models as models
import unit_tests.test_utils.test_schemas as schemas

db = "fake db session"
user_test = models.user_model()
wrong_user_test = models.wrong_user_model()
user_test_schema = schemas.user_schema()
wrong_user_test_schema = schemas.wrong_user_schema()

@patch("queries.get_user", return_value=user_test)
def test_get_user(mock_get_user):
    mock_result = queries.get_user(db, user_test_schema.email)
    assert mock_get_user.called_once_with(db, user_test_schema.email)
    assert mock_result == user_test

@patch("queries.get_user")
def test_get_user_inexistent(mock_get_user):
    mock_get_user.side_effect = HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    with pytest.raises(HTTPException):
        queries.get_user(db, wrong_user_test_schema.email)


@patch("queries.create_user", return_value=user_test)
def test_create_user(mock_create_user):
    mock_result = queries.create_user(db, user_test_schema)
    assert mock_create_user.called_once_with(db, user_test_schema)
    assert mock_result == user_test


@patch("queries.create_user")
def test_create_user_existent(mock_create_user):
    mock_create_user.side_effect = Exception
    with pytest.raises(Exception):
        queries.create_user(db, user_test_schema)


@patch("queries.change_password")
def test_change_password(mock_change_password):
    queries.change_password(db, user_test_schema, constants.user_new_password)
    assert mock_change_password.called_once_with(db, user_test_schema, constants.user_new_password)
    
@patch("queries.change_password")
def test_change_password_inexisted(mock_change_password):
    mock_change_password.side_effect = HTTPException(status.HTTP_404_NOT_FOUND)
    with pytest.raises(HTTPException):
        queries.change_password(db, user_test_schema, constants.user_new_password)
    