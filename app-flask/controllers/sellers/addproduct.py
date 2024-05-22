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
    photo = data.get('photo')
    category = data.get('category')
    price = data.get('price')

    if not isinstance(photo, bytes):
        return jsonify({'error': 'El valor de photo no es de tipo bytes-like'}), 400

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


