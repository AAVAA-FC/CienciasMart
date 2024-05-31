from flask import request, jsonify
from model.buyer_model import *
from model.product_model import *
from model.review_model import *
from . import reviews_bp

@reviews_bp.route('/addreview', methods=['POST'])
def addreview():
    data = request.get_json()
    product_id = data.get('product_id')
    buyer_id = data.get('buyer_id')
    comment = data.get('comment')
    score = data.get('score')

    if buyer_id is None:
        return jsonify({'error': 'Faltan datos en la solicitud. Se requiere el ID del comprador,.'}), 400
    if product_id is None:
        return jsonify({'error': 'Faltan datos en la solicitud. Se requiere el ID del producto,.'}), 400
    if comment is None:
        return jsonify({'error': 'Faltan datos en la solicitud. Se requiere el comentario,.'}), 400
    if score is None:
        return jsonify({'error': 'Faltan datos en la solicitud. Se requiere el score del comprador,.'}), 400
    
    if not (0 <= score <= 5):
        return jsonify({'error': 'El score debe estar entre 0 y 5'}), 400

    buyer = get_buyer_by_id(buyer_id)
    product = get_product_by_id(product_id)

    if not buyer:
        return jsonify({'error': 'Comprador no encontrado.'}), 404
    if not product:
        return jsonify({'error': 'Producto no encontrado.'}), 404

    review = add_review(product_id=product_id,
            buyer_id=buyer_id,
            comment=comment,
            score=score)

    if review is None:
        return jsonify({'error': 'No se pudo crear la review'}), 500

    return jsonify({'message': 'Publicación exitosa'}), 200
