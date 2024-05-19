from sqlalchemy import Column, Integer, String, Float, ForeignKey, CheckConstraint, LargeBinary
from sqlalchemy.orm import relationship

from db.alchemyClasses import db
from bcrypt import hashpw, checkpw, gensalt


class Product(db.Model):

    __tablename__ = 'product'

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    seller_id = Column(Integer, ForeignKey('seller.seller_id'), nullable=False)
    name = Column(String(20), nullable=False)
    description = Column(String(80), nullable=False)
    stock = Column(Integer)
    cellphone = Column(String(10), nullable=False, unique=True)
    photo = Column(LargeBinary, nullable=False)
    category = Column(String(20), nullable=False)
    price = Column(Float, nullable=False)

    seller = relationship('Seller', back_populates='products')

    def __init__(self, seller_id, name, description, stock, cellphone, photo, category, price):
        self.seller_id=seller_id
        self.name = name
        self.description = description
        self.stock = stock
        self.cellphone = cellphone
        self.photo = photo
        self.category = category
        self.price = price

    def to_dict(self):
        return {
            'seller_id': self.seller_id,
            'name': self.name,
            'description': self.description,
            'stock': self.stock,
            'cellphone': self.cellphone,
            'photo': self.photo,
            'category': self.category,
            'price': self.price
        }
    

