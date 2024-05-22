import React, { useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router";
import HeaderBuyer from "../HeaderBuyer/HeaderBuyer";
import "./ProductPage.css";
import { Link } from "react-router-dom";
import frog from "../../../assets/frog.jpeg"
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from 'react-router';
import { useState } from "react";
import Review from "../Review/Review";
import WriteReview from "../Review/WriteReview";

function ProductPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { data: product, loading, error} = useFetch(`http://127.0.0.1:5000/api/products/product/${productId}`);
    const { user } = useAuth();
    const [reserved, setReserved] = useState(false);
    const [completed, setCompleted] = useState(false);
    const reservationUrl = user ? `http://127.0.0.1:5000/api/requests/get_request_status?buyer_id=${user.id}&product_id=${productId}` : null;
    const { data: reservationData, loading: reservationLoading, error: reservationError } = useFetch(reservationUrl);
    const [sellerData, setSellerData] = useState(null);



    useEffect(() => {
        if (reservationData) {
            reservationData.estado_request == "En Progreso" ? setReserved(true) : setReserved(false);
            reservationData.estado_request == "Completada" ? setCompleted(true) : setCompleted(false);
        }
    }, [reservationData]);

    useEffect(() => {
        if(product){
            fetchSellerData();
        }
    }, [product]);

    const fetchSellerData = async () => {
        
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/sellers/seller/${product.seller_id}`);
            if (!response.ok) {
                throw new Error(`Error cargando los datos: ${response.statusText}`);
            }
            const sellerData = await response.json();
            setSellerData(sellerData);
        } catch (error) {
            console.error(error);
        }
    };


    const reserveHandler = async (e) => {
        e.preventDefault();
        

        if(!user) {
            navigate('/login');
            return;
        }
        
        
        try {
            const data = {
                buyerId: user.id,
                productId: productId
            }

            const response = await fetch('http://127.0.0.1:5000/api/requests/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const response_data = await response.json();

            if(response.ok){
                setReserved(true);
            } else{
                console.log(response_data);
                throw new Error("Fallo al reservar");
            }
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    return (
        <div className="product">
            <div className="product-container">
                <div className="productpage-card">
                    {error && <h3 className="error-message">Error: {error.message}</h3>}
                    {loading && <h3 className="loading-message">Cargando...</h3>}
                    {product && (
                        <>
                            <div className="product-image">
                                <img src={frog} alt="Rana" /> {/* product.image */}
                            </div>
                            <div className="product-info">
                                <h2>{product.name}</h2> 
                                {sellerData && <div className="seller-info">
                                    <p>Vendedor: {sellerData.username}</p> 
                                    <p>Calificación: 5/5</p> {/* seller.calificacion */}
                                </div>}
                                <p className="description">
                                    { product.description }
                                </p>

                                <div className="footer-product">
                                    <p>{ product.stock } disponibles</p> 
                                    {reserved ? (
                                        <div className="reserved">
                                            <p className="reserved-message">Apartado</p>
                                            <p className="additional-message">Te mandamos un correo con la información</p>
                                        </div>
                                    ) : (
                                        <button className="reserve-button" onClick={reserveHandler}>Apartar</button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {!error && completed && <WriteReview userId={user.id} productId={productId}/>}
                {!error && <Review productId={productId} />} 
            </div>
        </div>
    );

}

export default ProductPage;
