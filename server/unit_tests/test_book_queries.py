from werkzeug.exceptions import HTTPException
import pytest
from mock import patch

import queries
from exception import CustomError
from . import t_constants
from . import t_schemas
from . import t_models

# will move these
testing_book = t_schemas.get_test_book()
new_book = t_models.get_test_book()
no_stock_book = t_models.get_test_book_no_stock()


@patch("queries.get_books")
def test_get_books(mock):
    queries.get_books()
    mock.assert_called_once()
    print(mock)


@patch("queries.add_book", return_value=new_book)
def test_add_book(mock):
    result = queries.add_book(testing_book)
    mock.assert_called_once_with(testing_book)
    assert result == new_book


@patch("queries.get_book", return_value=new_book)
def test_get_book_exists(mock):
    result = queries.get_book(testing_book.get("id"))
    mock.assert_called_once_with(testing_book.get("id"))
    assert result == new_book

@patch("queries.get_book")
def test_get_book_doesnt_exist(mock):
    mock.side_effect = HTTPException
    with pytest.raises(HTTPException):
        queries.get_book(t_constants.t_wrong_book_id)


@patch("queries.update_book_stock")
@pytest.mark.parametrize("stock", [1, -1])
def test_update_book_stock(mock, stock):
    queries.update_book_stock(new_book, stock)
    mock.assert_called_once_with(new_book, stock)
    
@patch("queries.update_book_stock")
def test_update_book_no_stock(mock):
    mock.side_effect = CustomError
    with pytest.raises(CustomError):
        queries.update_book_stock(no_stock_book, -1)