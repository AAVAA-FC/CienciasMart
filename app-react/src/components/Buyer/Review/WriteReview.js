import { useState } from "react";
import "./WriteReview.css";
import tick from '../../../assets/tick.svg';

function WriteReview({ userId, productId}) {
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const numericRating = parseInt(rating.split(" ")[0]);

        const reviewData = {
            userId,
            productId,
            rating: numericRating,
            comments: review,
        };

        

        try {
            const response = await fetch("http://127.0.0.1:5000/api/products/addReview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                console.log("Resena agregada correctamente");
                setSubmitted(true);
            } else {
                alert("Error al subir la reseña");
            }
        } catch (error) {
            console.error("Error al subir la reseña:", error);
            //alert("Error al subir la reseña");
            setSubmitted(true);
        }
    };

    return(
        <div className="write-review">
            <div className="writereview-section">
                <h2>Escribe una reseña</h2>
                <h3>Cuéntanos qué te pareció el producto</h3>
                {submitted ? (
                    <div className="success-message">
                        <img src={tick} alt="Check mark" className="tick" />
                        <p>Reseña enviada</p>
                    </div>
                ) : (
                    <form onSubmit={submitHandler} className="review-form">
                        <label htmlFor="rating">Calificación</label>
                        <select id="rating" name="rating" onChange={(e) => setRating(e.target.value)} required>
                            <option value="">Selecciona una calificación</option>
                            <option value="1">1 - Muy malo</option>
                            <option value="2">2 - Malo</option>
                            <option value="3">3 - Regular</option>
                            <option value="4">4 - Bueno</option>
                            <option value="5">5 - Muy bueno</option>
                        </select>
                        
                        <label htmlFor="review">Reseña</label>
                        <textarea id="review" name="review" rows="4" onChange={(e) => setReview(e.target.value)} required></textarea>
                        
                        <div className="send-review">
                            <button type="submit">Enviar Reseña</button>
                        </div>
                        
                    </form>
                )}
                
            </div>
        </div>
    );
}

export default WriteReview;