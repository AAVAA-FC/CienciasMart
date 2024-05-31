from flask import Flask, request, jsonify
from model.seller_model import *
from . import sellers_bp

@sellers_bp.route('/seller/<int:id>', methods=['GET'])
def product(id):
    seller = get_seller_by_id(id)
    if seller:
        return jsonify(seller.to_dict()), 200

    return jsonify({"message": "Producto no encontrado"}), 404

@sellers_bp.route('/seller/username', methods=['GET'])
def get_seller_username():
    seller_id = request.args.get('seller_id')

    if not seller_id:
        return jsonify({'error': 'Se requiere el ID del vendedor para realizar la búsqueda.'}), 400

    seller = get_seller_by_id(seller_id)

    if not seller:
        return jsonify({'error': 'No se encontró ningún vendedor con el ID proporcionado.'}), 404

    seller_name = seller.username;
    return jsonify({'seller_name': seller_name}), 200
