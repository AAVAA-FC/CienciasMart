from flask import request, jsonify
from model.buyer_model import *
from model.request_model import *
from model.seller_model import *
from . import requests_bp

@requests_bp.route('/buyers_by_product_request', methods=['GET'])
def get_buyers_by_product_request():
    product_id = request.args.get('product_id')
    
    if not product_id:
        return jsonify({'error': 'Se necesita el product_id'}), 400

    requests = get_unfinished_requests_by_product_id(product_id)

    buyer_ids = [req.buyer_id for req in requests]

    buyers = get_buyers_by_ids(buyer_ids)

    buyers_list = [{'id': buyer.buyer_id, 'username': buyer.username} for buyer in buyers]

    return jsonify(buyers_list), 200
