from ..model import User
from werkzeug.security import check_password_hash
from werkzeug.exceptions import HTTPException
from ..repository.user_repository import UserRepository


class AuthService:
    def __int__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def register(self, username: str, email: str, password: str):
        try:
            existing_user = self.user_repository.get_by_email(email)
            if existing_user:
                raise HTTPException(description="User already exists", response=400)

            password_hash = User.hash_password(password)
            user = self.user_repository.create({"username": username, "email": email, "password": password_hash})
            return user
        except HTTPException:
            raise HTTPException(description="Internal server error!", response=500)




