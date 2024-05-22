from flask import jsonify
from model.product_model import *
from . import products_bp

@products_bp.route('/product//<int:id>', methods=['GET'])
def product(id):
    product = get_product_by_id(id)
    if product:
        return jsonify(product.to_dict()), 200

    return jsonify({"message": "Producto no encontrado"}), 404

