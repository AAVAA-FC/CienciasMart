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

def search_products(search_query):
    sql_query = f"""
        SELECT * FROM product 
        WHERE MATCH(name, description, category) AGAINST (:search_query IN BOOLEAN MODE)
    """
    
    products = db.session.execute(sql_query, {'search_query': search_query})
    
    product_objects = []
    for row in products:
        product = Product(
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

    


