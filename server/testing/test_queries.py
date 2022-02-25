# from importlib.resources import path
# import pytest
# # from pytest_mock import MockerFixture
# from mock import patch
# from werkzeug.exceptions import NotFound
# import queries
# from exception import CustomError
# from models import User
# from schemas import UserSchema

# from . import t_schemas
# from . import t_models



# # @pytest.fixture
# # def mock_user_model(mocker: MockerFixture):
# #     return mocker.patch("models.User")


# class TestUserQueries:
#     # create the db mock and make sure
#     # all the tests are using it (by 
#     # specifying autouse=True)
#     # @pytest.fixture(autouse=True)
#     # def mock_database(self, mocker: MockerFixture):
#     #     return mocker.patch("connection.db")


#     def test_get_existing_user(self):
#         email = t_schemas.get_test_user_schema().get("email")
#         assert queries.get_user(email).email == email

#     def test_get_not_existing_user(self):
#         email = t_schemas.get_test_wrong_user().get("email")
#         with pytest.raises(NotFound):
#             queries.get_user(email)



#     def test_login_existing_user(self, mock_database):
#         user = t_schemas.get_test_user_schema()
#         assert queries.login_user(user) == {"email": user.get("email"), "role": user.get("role")}

#     def test_login_not_existing_user(self, mock_database):
#         with pytest.raises(NotFound):
#             queries.login_user(t_schemas.get_test_wrong_user())

#     # @patch.object("models.User")
#     # def test_create_user(self):
#     #     print(mock_user_model.query.filter_by(email="admin@mail.com")())
#     #     assert queries.create_user(t_schemas.get_test_new_user()) == t_models.get_test_new_user()

#     # @pytest.mark.skip
#     # def test_create_user(mock_database):
#     #     user_schema = UserSchema()
#     #     user = user_schema.dump({"email": "testing@fake.com", "password": "1234", "role": "user"})


