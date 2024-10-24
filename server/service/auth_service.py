from ..model import User
from werkzeug.exceptions import HTTPException, abort
from sqlalchemy.exc import IntegrityError
from ..repository.user_repository import UserRepository
from ..util.helper import Helper


class AuthService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def register(self, username: str, email: str, password: str):
        try:
            existing_user = self.user_repository.get_by_email(email)
            if existing_user:
                abort(400, description="User already exists!")
            password_hash = User.hash_password(password)
            user = self.user_repository.create(username=username, email=email, password=password_hash)
            return user
        except IntegrityError:
            abort(500, description="Internal server error")

    def login(self, email: str, password: str) -> dict:
        try:
            user = self.user_repository.get_by_email(email)
            if not user or not user.check_password(password):
                abort(400, description="Invalid credentials!")
            access_token = Helper.generate_access_token({"id": user.id})
            refresh_token = Helper.generate_refresh_token({"id": user.id})
            return {"access_token": access_token, "refresh_token": refresh_token}
        except IntegrityError:
            abort(500, description="Internal server error")



