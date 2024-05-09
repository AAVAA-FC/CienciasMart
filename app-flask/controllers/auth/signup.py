from flask import Blueprint, request, jsonify
from db.alchemyClasses.Seller import Seller
from db.alchemyClasses.Buyer import Buyer
from model.seller_model import *
from model.buyer_model import *
from . import auth_bp
from utils.utils import generate_temporary_password

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data)
    email = data.get('email')

    if get_seller_by_email(email) or get_buyer_by_email(email):
        return jsonify({'error': 'Correo ya registrado.'}), 400

    username = data.get('name')
    if get_seller_by_username(username) or get_buyer_by_username(username):
        return jsonify({'error': 'Nombre de usuario ya registrado.'}), 400

    phone = data.get('phone')
    if get_seller_by_cellphone(phone) or get_buyer_by_cellphone(phone):
        return jsonify({'error': 'Teléfono ya registrado.'}), 400

    role = data.get('role')

    password = generate_temporary_password()
    print(password)

    if role == "Comprador":
        user = add_buyer(email=email, username=username, cellphone=phone,
                         password=password)
    else:
        user = add_seller(email=email, username=username, cellphone=phone,
                          password=password)

    return jsonify({'message': 'Registro exitoso', 'tipo': role}), 200
