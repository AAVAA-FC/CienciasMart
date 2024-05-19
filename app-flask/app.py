from flask import Flask, render_template
from flask_cors import CORS
from db.alchemyClasses import db
from controllers.auth.auth import auth_bp
from controllers.products import products_bp

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://aavaa:aavaa@localhost:3306/cienciasmart'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)


app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(products_bp, url_prefix='/api/products')
if __name__ == '__main__':
    app.run()
