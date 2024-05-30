from db.alchemyClasses.Product import Product, db


def get_product_by_id(product_id: str):
    return Product.query.filter(Product.product_id == product_id).first()
