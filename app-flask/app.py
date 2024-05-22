from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from db.alchemyClasses import db
from controllers.auth import auth_bp
from controllers.sellers import sellers_bp
from mail.mail import mail
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://aavaa:aavaa@localhost:3306/cienciasmart'
app.config.from_mapping(
    SECRET_KEY='dev'
)

app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME')
app.config['CIENCIASMART_MAIL_SUBJECT_PREFIX'] = '[Cienciasmart]'


db.init_app(app)
mail.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(sellers_bp, url_prefix='/api/sellers')
if __name__ == '__main__':
    app.run()
