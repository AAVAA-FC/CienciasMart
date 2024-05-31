from db.alchemyClasses.Product import Product

def get_products():
    products = Product.query.limit(20).all()
    return products
