from flask import Flask
from flask_cors import CORS
from .model import db
from .controller.auth_controller import auth_controller


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://root:root@localhost/postgres"


db.init_app(app)
with app.app_context():
    db.create_all()

CORS(app, supports_credentials=True)

app.register_blueprint(auth_controller, url_prefix="/api/auth")


if __name__ == "__main__":
    app.run(port=1234, debug=True)


