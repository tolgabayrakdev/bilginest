from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import HTTPException
from ..model import User


class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, user: dict):
        """Yeni kullanıcıyı veritabanına ekler"""
        try:
            user = User(
                username=user["username"],
                email=user["email"],
                password=user["password"],
            )
            self.session.add(user)
            self.session.commit()
            self.session.refresh(user)
            return user
        except IntegrityError:
            self.session.rollback()
            raise HTTPException(description="User already exists",response=400)
        finally:
            self.session.close()

    def get_by_id(self, id: int):
        try:
            return self.session.query(User).filter(User.id == id).first()
        except Exception:
            raise HTTPException(description="User not found",response=404)

    def get_by_email(self, email: str):
        try:
            return self.session.query(User).filter(User.email == email).first()
        except Exception:
            raise HTTPException(description="User not found",response=404)

    def update(self, user_data: dict, id: int):
        try:
            user = self.get_by_id(id)
            if not user:
                raise HTTPException(description="User not found",response=404)
            for key, value in user_data.items():
                if hasattr(user, key):
                    setattr(user, key, value)

            self.session.commit()
            self.session.refresh(user)
        except Exception:
            self.session.rollback()
            raise HTTPException(description="User not found",response=404)
        finally:
            self.session.close()
