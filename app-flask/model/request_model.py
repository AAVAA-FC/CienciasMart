from db.alchemyClasses.Request import Request
from db.alchemyClasses.Buyer import db

def get_request_by_ids(buyer_id: str, product_id: str):
    return Request.query.filter(Request.buyer_id == buyer_id, Request.product_id == product_id).first()
