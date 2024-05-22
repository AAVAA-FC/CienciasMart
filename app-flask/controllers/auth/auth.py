from flask import Blueprint, request, jsonify
from db.alchemyClasses.Seller import Seller
from db.alchemyClasses.Buyer import Buyer
from model.seller_model import *
from model.buyer_model import *

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password') 
    seller = get_seller_by_email(email)
    buyer = get_buyer_by_email(email)

    if seller:
        tipo = 'seller'
        user = seller
    elif buyer:
        tipo = 'buyer'
        user = buyer
    else:
        return jsonify({'error': 'Correo inválido.'}), 401

    if not user.check_password(password):
        return jsonify({'error': 'Contraseña inválida.'}), 401

    # Puedes incluir el tipo de usuario en el JSON de respuesta
    return jsonify({'message': 'Inicio de sesión exitoso', 'tipo': tipo}), 200
