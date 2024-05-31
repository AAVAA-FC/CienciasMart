from db.alchemyClasses.Request import Request
from db.alchemyClasses.Buyer import db

def get_unfinished_requests_by_product_id(product_id):
    return Request.query.filter_by(product_id=product_id, finished=False).all()

def get_request_by_ids(buyer_id: str, product_id: str):
    return Request.query.filter(Request.buyer_id == buyer_id, Request.product_id == product_id).first()

def finish_request_by_ids(buyer_id:str, product_id:str):    
    try:
        req = Request.query.filter(Request.buyer_id == buyer_id, Request.product_id == product_id).first()
        req.finished = True        
        db.session.commit()
        return req
    except Exception as e:
        db.session.rollback()
        return None

def add_request(buyer, product, quantity_requested):
    new_request = Request(
        buyer_id = buyer.buyer_id,
        product_id=product.product_id,
        quantity_requested=quantity_requested,
        finished=False
    )

    product.stock -= quantity_requested
    db.session.add(new_request)
    db.session.commit()
