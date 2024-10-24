import jwt
import hashlib
import os
import time


class Helper:
    @staticmethod
    def generate_access_token(payload: dict):
        return jwt.encode(
            {"some": payload, "exp": int(time.time() + 1200)},
            os.getenv("JWT_SECRET_KEY"),
            algorithm="HS256",
        )

    @staticmethod
    def generate_refresh_token(payload: dict):
        return jwt.encode(
            {"some": payload}, os.getenv("JWT_SECRET_KEY"), algorithm="HS256"
        )

    @staticmethod
    def generate_hash_password(password: str):
        return hashlib.sha256(password.encode()).hexdigest()

    @staticmethod
    def decode_token(access_token: str):
        try:
            decode_token = jwt.decode(
                access_token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"]
            )
            print("Decoded token: ", decode_token)

            return decode_token.get("some")
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."