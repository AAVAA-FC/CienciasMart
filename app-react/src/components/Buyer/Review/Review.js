import { useFetch } from '../../../hooks/useFetch';
import './Review.css'

function Review({ productId }) {
    const { data: reviews, loading, error} = useFetch(`http://127.0.0.1:5000/api/products/reviews/${productId}`);

    return(
        <div className="review">
            <div className="review-section">
                <h2>Reseñas del producto</h2>
                
                <div className="review-cards">
                    {error && <h3 className="error-message">Error: {error.message}</h3>}

                    {loading && <h3 className="loading-message">Cargando...</h3>}

                    {reviews?.map((review) => (
                        <div key={review.id} className="review-card">
                            <h3>Julieta Ordaz</h3> {/** review.name */}
                            <p>Me encantó el producto, es demasiado bello!</p> {/** review.comment */}
                            <p>Calificación: 5/5</p> {/** review.rating */}
                        </div>  
                    ))}

                    <div className="review-card">
                        <h3>Julieta Ordaz</h3>
                        <p>Me encantó el producto, es demasiado bello!</p>
                        <p>Calificación: 5/5</p>
                    </div>

                    <div className="review-card">
                        <h3>Julieta Ordaz</h3>
                        <p>Me encantó el producto, es demasiado bello!</p>
                        <p>Calificación: 5/5</p>
                    </div>
                    
                </div>
               
            </div>
        </div>
    );
}

export default Review;