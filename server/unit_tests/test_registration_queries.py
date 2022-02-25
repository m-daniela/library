from matplotlib.pyplot import connect
from werkzeug.exceptions import HTTPException
import pytest
from mock import patch, Mock

import queries
import connection
from exception import CustomError
from . import t_constants
from . import t_schemas
from . import t_models


registration_no_checkout = t_models.get_test_registration_no_checkout()
registration = t_models.get_test_registration()

@patch("queries.checkin", return_value=registration_no_checkout)
def test_checkin_user_book_exist(mock):
    result = queries.checkin(t_constants.t_book_id, t_constants.t_email)
    mock.assert_called_once_with(t_constants.t_book_id, t_constants.t_email)
    assert result == registration_no_checkout

@pytest.mark.parametrize("book_id, email", [(t_constants.t_wrong_book_id, t_constants.t_email), (t_constants.t_book_id, t_constants.t_wrong_email)])
def test_checkin_user_book_dont_exist(book_id, email):
    with pytest.raises(HTTPException):
        queries.checkin(book_id, email)



# tested the update_book_stock function which
# is called inside this one
# skip for now 
# @patch("queries.get_user")
# @patch("queries.get_book")
# def test_checkin_book_no_stock(mock_user, mock_book):
#     # mocked the update_book_stock function here
#     # so the side effect could've been added
#     queries.update_book_stock = Mock()
#     queries.update_book_stock.side_effect = CustomError

#     with pytest.raises(CustomError):
#         queries.checkin(t_constants.t_book_id, t_constants.t_email)


@patch("queries.get_user")
@patch("queries.get_book")
@patch("queries.update_book_stock")
def test_checkin_book_no_stock(mock_user, mock_book, mock_update):
    mock_update.side_effect = CustomError

    with pytest.raises(CustomError):
        queries.checkin(t_constants.t_book_id, t_constants.t_email)


@patch("queries.get_user")
@patch("queries.get_book")
@patch("queries.update_book_stock")
@patch("connection.db")
def test_checkin_registration_exists(mock_user, mock_book, mock_update, mock_db):
    mock_db.side_effect = Exception
    with pytest.raises(Exception):
        queries.checkin(t_constants.t_book_id, t_constants.t_email)



def test_checkout_user_book_registration_exist():
    pass


def test_checkout_user_doesnt_exist():
    pass

def test_checkout_book_doesnt_exist():
    pass

def test_checkout_registration_doesnt_exist():
    pass

def test_checkout_registration_checked_out():
    pass







def test_get_registrations_for_user():
    pass

def test_get_registrations_user_doesnt_exist():
    pass