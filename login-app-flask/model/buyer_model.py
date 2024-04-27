from db.alchemyClasses.Buyer import Buyer
from db.alchemyClasses.Buyer import db

def get_buyer_by_email(email: str):
    return Buyer.query.filter(Buyer.email == email).first()
