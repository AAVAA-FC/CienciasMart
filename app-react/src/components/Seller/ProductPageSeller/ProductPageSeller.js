import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import frog from "../../../assets/frog.jpeg";
import { useFetch } from "../../../hooks/useFetch";
import HeaderSeller from "../HeaderSeller/HeaderSeller";
import Interested from "../Interested/Interested"; // Importa el componente de interesados
import Review from "../Review/Review";
import "./ProductPageSeller.css";
import ImageDecoder from '../../../utils/ImageDecoder/ImageDecoder';

function ProductPageSeller() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { data: product, loading, error } = useFetch(`http://127.0.0.1:5000/api/products/product/${productId}`);
    console.log(product);
    const { data: interestedUsers, loadingInterested, errorInterested } = useFetch(`http://localhost:5000/api/requests/buyers_by_product_request?product_id=${productId}`);
    const handleHomeSeller = () => {
        navigate('/homeseller');
    };

    const handleUpdateProductClick = () => {
        navigate(`/actualizar-producto/${productId}`);
    };
    const [sellerData, setSellerData] = useState(null);
    const reviews = [
        { user: "Usuario1", rating: 4, text: "Muy buen producto, recomendado." },
        { user: "Usuario2", rating: 5, text: "Excelente calidad y diseño." },
        { user: "Usuario3", rating: 3, text: "Cumple su función, pero el envío fue un poco lento." },
        { user: "Usuario4", rating: 4, text: "Me gustó mucho el diseño, aunque esperaba que fuera un poco más grande." },
        { user: "Usuario5", rating: 5, text: "¡Me encanta! La calidad es excelente y el diseño es muy bonito. Totalmente recomendado." },
    ];
    /*
        const interestedUsers = [
            { user: "Interesado1" },
            { user: "Interesado2" },
            { user: "Interesado3" },
            { user: "Interesado4" },
            { user: "Interesado5" },
        ];
    */
    return (
        <>
            <HeaderSeller />
            <div className="product">
                <button className="home-seller-button" onClick={handleHomeSeller}>
                    Regresar
                </button>
                <div className="product-container">
                    <div className="productpage-card">
                        {error && <h3 className="error-message">Error: {error.message}</h3>}
                        {loading && <h3 className="loading-message">Cargando...</h3>}
                        {product && ( // Add conditional check for product
                            <div>
                                <div className="product-image">
                                    <ImageDecoder base64Image={product.photo} />
                                </div>
                                <div className="product-info">
                                    <h2>{product.name}</h2>
                                    {sellerData && (
                                        <div className="seller-info">
                                            <p>Vendedor: {sellerData.username}</p>
                                        </div>
                                    )}
                                    <p className="description">{product.description}</p>
                                    <p><strong>Categoría:</strong> {product.category}</p>
                                    <p><strong>Costo:</strong> ${product.price}</p>
                                    <div className="footer-product">
                                        <p>{product.stock} disponibles</p>
                                        <button className="reserve-button" onClick={handleUpdateProductClick}>Editar</button>
                                        <button className="reserve-button-eliminar">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="reviews-interested-container">
                        <div className="reviews-section">
                            <h3>Reseñas</h3>
                            {reviews.map((review, index) => (
                                <Review
                                    key={index}
                                    user={review.user}
                                    rating={review.rating}
                                    text={review.text}
                                />
                            ))}
                        </div>
                        <div className="interested-section">
                            <h3>Interesados</h3>
                            {interestedUsers?.map((interested) => (
                                <Interested
                                    key={interested.buyer_id}
                                    user={interested}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ProductPageSeller;
