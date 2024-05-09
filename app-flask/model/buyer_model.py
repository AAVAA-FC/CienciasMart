from db.alchemyClasses.Buyer import Buyer
from db.alchemyClasses.Buyer import db

def get_buyer_by_email(email: str):
    return Buyer.query.filter(Buyer.email == email).first()

def get_buyer_by_username(username: str):
    return Buyer.query.filter(Buyer.username == username).first()

def get_buyer_by_cellphone(cellphone: str):
    return Buyer.query.filter(Buyer.cellphone == cellphone).first()

def add_buyer(email:str, username:str, phone:str):
    try:
        buyer = Buyer(email=email, username=username, phone=phone)

        db.session.add(buyer)
        db.session.commit()
        return buyer
    except (Exception) as e:
        return None
