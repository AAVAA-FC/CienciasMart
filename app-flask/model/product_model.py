from db.alchemyClasses.Product import Product
from db.alchemyClasses.Product import db
import base64

def get_product_by_id(product_id):
    return Product.query.filter(Product.product_id == product_id).first()

def update_product_attributes(product, data):
    if 'name' in data:
        product.name = data['name']
    if 'description' in data:
        product.description = data['description']
    if 'stock' in data:
        product.stock = data['stock']
    if 'photo' in data:
        product.photo = base64.b64decode(data['photo'])
    if 'category' in data:
        product.category = data['category']
    if 'price' in data:
        product.price = data['price']

    db.session.commit()
