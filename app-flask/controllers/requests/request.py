from flask import request, jsonify
from model.buyer_model import *
from model.seller_model import *
from model.request_model import *
from model.product_model import *
from . import requests_bp

@requests_bp.route('/buyers_by_product_request', methods=['GET'])
def get_buyers_by_product_request():
    product_id = request.args.get('product_id')
    
    if not product_id:
        return jsonify({'error': 'Se necesita el product_id'}), 400

    requests = get_unfinished_requests_by_product_id(product_id)

    buyer_ids = [req.buyer_id for req in requests]

    buyers = get_buyers_by_ids(buyer_ids)

    buyers_list = [{'id': buyer.buyer_id,
                    'username': buyer.username,
                    'email':buyer.email} for buyer in buyers]

    return jsonify(buyers_list), 200

@requests_bp.route('/request', methods=['POST'])
def request_product():
    data = request.get_json()
    buyer_id = data.get('buyerId')
    product_id = data.get('produtIcd')

    if not buyer_id or not product_id:
        return jsonify({'error': 'Falta el ID del comprador o del producto en los datos enviados.'}), 400

    buyer = get_buyer_by_id(buyer_id)
    product = get_product_by_id(product_id)

    
    if buyer is None:
        return jsonify({'error': 'Comprador no encontrado.'}), 404

    if product is None:
        return jsonify({'error': 'Producto no encontrado.'}), 404

    if buyer.has_requested(product):
        return jsonify({'message': 'Comprador ya ha pedido el producto.'}), 400

    buyer.request(product)
    return jsonify({'message': 'Petición exitosa'}), 200

@requests_bp.route('/get_request_status', methods=['GET'])
def get_request_status():
    buyer_id = request.args.get('buyer_id')
    product_id = request.args.get('product_id')

    if not buyer_id or not product_id:
        return jsonify({'error': 'Falta el ID del comprador o del producto en los datos enviados.'}), 400

    request_data = get_request_by_ids(buyer_id=buyer_id, product_id=product_id)

    if request_data is None:
        estado_request = "No encontrada"
    elif request_data.finished:
        estado_request = "Completada"
    else:
        estado_request = "En Progreso"
    return jsonify({'estado_request': estado_request}), 200
