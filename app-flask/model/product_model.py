from db.alchemyClasses.Product import Product, db
from sqlalchemy import text

def get_product_by_id(product_id: str):
    return Product.query.filter(Product.product_id == product_id).first()

def get_products_by_id(seller_id):
    return Product.query.filter(Product.seller_id == seller_id).all()

def add_product(seller_id: int, name: str, description: str, stock: int,
                cellphone: str, photo: bytes, category: str, price: float):
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

def search_products(search_query):
    sql_query = f"""
        SELECT * FROM product 
        WHERE MATCH(name, description, category) AGAINST (:search_query IN BOOLEAN MODE)
    """
    
    query = text(sql_query)
    
    products = db.session.execute(query, {'search_query': search_query})
    
    product_objects = []
    for row in products:
        product = Product(
            product_id =row.product_id,
            seller_id=row.seller_id,
            name=row.name,
            description=row.description,
            stock=row.stock,
            cellphone=row.cellphone,
            photo=row.photo,
            category=row.category,
            price=row.price
        )
        product_objects.append(product)
    
    products.close()
    
    return product_objects

def get_products():
    products = Product.query.limit(20).all()
    return products
