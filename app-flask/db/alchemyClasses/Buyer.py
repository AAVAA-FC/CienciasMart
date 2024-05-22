from sqlalchemy import Column, Integer, String
from db.alchemyClasses import db
from .Request import Request
from bcrypt import hashpw, checkpw, gensalt


class Buyer(db.Model):

    __tablename__ = 'buyer'

    buyer_id = Column(Integer, primary_key=True)
    username = Column(String(20))
    email = Column(String(40), unique=True)
    password = Column(String(60))
    cellphone = Column(String(10), unique=True)

    products_requested = db.relationship('Product',
                                         secondary='request',
                                         back_populates='buyers',
                                         lazy='dynamic')

    def __init__(self, username, email, password, cellphone):
        self.username = username
        self.email = email
        self.cellphone = cellphone
        self.set_password(password)

    def set_password(self, password):
        hashed_password = hashpw(password.encode('utf-8'), gensalt())
        self.password = hashed_password.decode('utf-8')
        
    def check_password(self, password):
        return checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def request(self, product):
        if product not in self.products_requested:
            self.products_requested.append(product)
            db.session.commit()
        
    def has_requested(self, product):
        if product.product_id is None:
            return False
        print("AHAHA")
        return self.products_requested.filter(Request.product_id == product.product_id).first() is not None

