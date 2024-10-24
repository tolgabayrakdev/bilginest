from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import HTTPException, abort
from ..model import User


class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, username: str, email: str, password: str):
        """Yeni kullanıcıyı veritabanına ekler"""
        try:
            user = User(
                username=username,
                email=email,
                password=password,
            )
            print("user: ", user.to_dict())
            self.session.add(user)
            self.session.commit()
            self.session.refresh(user)
            return user
        except IntegrityError:
            self.session.rollback()
            raise abort(400, description="User already exists!")
        finally:
            self.session.close()

    def get_by_id(self, id: int):
        try:
            return self.session.query(User).filter(User.id == id).first()
        except Exception:
            raise abort(404, description="User not found")

    def get_by_email(self, email: str):
        try:
            return self.session.query(User).filter(User.email == email).first()
        except Exception:
            raise abort(404, description="User not found")

    def update(self, user_data: dict, id: int):
        try:
            user = self.get_by_id(id)
            if not user:
                raise abort(404, description="User not found")
            for key, value in user_data.items():
                if hasattr(user, key):
                    setattr(user, key, value)

            self.session.commit()
            self.session.refresh(user)
        except Exception:
            self.session.rollback()
            raise abort(500, description="Internal server error")
        finally:
            self.session.close()
