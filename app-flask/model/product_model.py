from db.alchemyClasses.Product import Product
from db.alchemyClasses.Product import db

def get_products_by_id(seller_id):
    return Product.query.filter(Product.seller_id == seller_id).all()

def add_product(seller_id: int, name: str, description: str, stock: int, cellphone: str, photo: bytes, category: str, price: float):
    try:
        product = Product(
            seller_id=seller_id,
            name=name,
            description=description,
            stock=stock,
            cellphone=cellphone,
            photo=photo,
            category=category,
            price=price
            )
        db.session.add(product)
        db.session.commit()
        return product
    except (Exception) as e:
            return None