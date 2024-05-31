from flask import Blueprint, request, jsonify
from db.alchemyClasses.Seller import Seller
from db.alchemyClasses.Product import Product
from model.seller_model import *
from model.product_model import *
from . import sellers_bp
import base64

@sellers_bp.route('/addproduct/<int:seller_id>', methods=['POST', 'GET'])
def addproduct(seller_id):
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    stock = data.get('stock')
    cellphone = data.get('cellphone')
    photo_base64 = data.get('photo')
    category = data.get('category')
    price = data.get('price')

    if not isinstance(seller_id, int):
        return jsonify({"error": "Seller_id no está en enteros "}), 400

    if isinstance(photo_base64, str):
        try:
            photo = base64.b64decode(photo_base64)
        except Exception as e:
            return jsonify({"error": "Cadena Basee64 inválida"}), 400
    else:
        return jsonify({"error": "La foto debe ser pasada en una cadena en Base64"}), 400

    if not isinstance(photo, bytes):
        return jsonify({"error": "Foto aun no está en bytlike"}), 400

    product = add_product(seller_id=seller_id,
            name=name,
            description=description,
            stock=stock,
            cellphone=cellphone,
            photo=photo,
            category=category,
            price=price)

    if product is None:
        return jsonify({'error': 'Error interno de servidor'}), 500

    return jsonify({'message': 'Publicación exitosa'}), 200

