from flask import Blueprint, request, jsonify
from db.alchemyClasses import db
from db.alchemyClasses import Request
from model.buyer_model import *
from model.product_model import *
from . import requests_bp

@requests_bp.route('/request', methods=['POST'])
def request_product():
    data = request.get_json()
    buyer_id = request.args.get('buyerId')
    product_id = request.args.get('productId')

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
