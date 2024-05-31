from db.alchemyClasses.Buyer import Buyer

def get_buyers_by_ids(buyer_ids):
    return Buyer.query.filter(Buyer.buyer_id.in_(buyer_ids)).all()
