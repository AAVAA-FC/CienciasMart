from flask import request, jsonify
from model.buyer_model import *
from model.product_model import *
from model.review_model import *
from . import reviews_bp

@reviews_bp.route('/addreview', methods=['POST'])
def addreview():
    data = request.get_json()
    product_id=data.get('product_id')
    buyer_id = data.get('buyer_id')
    date = data.get('date')
    comment = data.get('comment')
    score = data.get('score')

    if not buyer_id or not product_id or date or comment or score is None:
        return jsonify({'error': 'Faltan datos en la solicitud. Se requiere el ID del comprador, el ID del producto, la fecha, comentario y puntaje.'}), 400
    if not (0 <= score <= 5):
        return jsonify({'error': 'El score debe estar entre 0 y 5'}), 400

    buyer = get_buyer_by_id(buyer_id)
    product = get_product_by_id(product_id)

    if not buyer:
        return jsonify({'error': 'Comprador no encontrado.'}), 404
    if not product:
        return jsonify({'error': 'Producto no encontrado.'}), 404

    if quantity_requested > product.stock:
        return jsonify({'error': 'La cantidad solicitada excede la cantidad en stock disponible.'}), 400

    if buyer.has_requested(product):
        return jsonify({'message': 'El comprador ya ha pedido el producto.'}), 400

    try:
        buyer.request(product, quantity_requested)
        return jsonify({'message': 'Petición exitosa'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

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
