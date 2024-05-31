from db.alchemyClasses.Review import Review
from db.alchemyClasses.Review import db
from datetime import date

def add_review(product_id: int, buyer_id: int, comment: str, score: float):
    try:
        date = date.today()
        review = Review(
            product_id=product_id,
            buyer_id=buyer_id,
            comment=comment,
            score=score
            )
        db.session.add(review)
        db.session.commit()
        return review
    except (Exception) as e:
        print(f"Error al agregar la review: {e}")
        db.session.rollback()
        return None