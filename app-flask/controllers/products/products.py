from flask import request, jsonify
from model.seller_model import *
from model.buyer_model import *
from model.product_model import *
from . import products_bp

@products_bp.route('/update', methods=['POST'])
def update_product():
    data = request.get_json()

    product_id = data.get('product_id')

    if product_id is None:
        return jsonify({'error': 'Se requiere el ID del producto para actualizar.'}), 400

    product = get_product_by_id(product_id)

    if product is None:
        return jsonify({'error': 'Producto no encontrado.'}), 404

    update_product_attributes(product, data)

    return jsonify(product.to_dict()), 200
