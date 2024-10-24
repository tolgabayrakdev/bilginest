from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from ..service.auth_service import AuthService
from ..repository.user_repository import UserRepository
from werkzeug.exceptions import abort
from ..model import db

auth_controller = Blueprint("auth_controller", __name__)

user_repository = UserRepository(session=db.session)
auth_service = AuthService(user_repository=user_repository)

@auth_controller.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        result = auth_service.login(email, password)
        response = jsonify({"message": "User logged in"})
        response.set_cookie("access_token", result["access_token"], httponly=True)
        response.set_cookie("refresh_token", result["refresh_token"], httponly=True)
        return response, 200
    except IntegrityError:
        abort(500, description="Internal server error")

@auth_controller.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "Username, email and password are required"}), 400

    try:
        result = auth_service.register(username, email, password)
        return jsonify({"message": "User created", "result": result.to_dict()}), 201
    except IntegrityError:
        abort(500, description="Internal server error")

@auth_controller.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "User logged out"})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response, 200
