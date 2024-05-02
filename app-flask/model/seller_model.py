from db.alchemyClasses.Seller import Seller
from db.alchemyClasses.Seller import db

def get_seller_by_email(email: str):
    return Seller.query.filter(Seller.email == email).first()
