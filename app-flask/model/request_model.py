from db.alchemyClasses.Request import Request
from db.alchemyClasses.Buyer import db

def get_unfinished_requests_by_product_id(product_id):
    return Request.query.filter_by(product_id=product_id, finished=False).all()
