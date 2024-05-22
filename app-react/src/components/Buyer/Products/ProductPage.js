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
    const reservationUrl = user ? `http://127.0.0.1:5000/api/get_request_status?buyer_id=${user.id}&product_id=${productId}` : null;
    const { data: reservationData, loading: reservationLoading, error: reservationError } = useFetch(reservationUrl);
    

    useEffect(() => {
        if (reservationData) {
            setReserved(true);
            if(reservationData.isCompleted){
                setCompleted(true);
            }
        }
    }, [reservationData]);

    const testHandler = () => {
        console.log("Id: ");
        console.log(productId);
        console.log("Product:");
        console.log(product);
        console.log(error);
        setReserved(true);
    }
    const reserveHandler = async (e) => {
        e.preventDefault();

        if(!user) {
            navigate('/login');
            return;
        }
        
        
        try {

            const data = {
                buyerId: user.id,
                productId: product.id
            }

            const response = await fetch('http://127.0.0.1:5000/api/requests/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if(response.ok){
                setReserved(true);
            } else{
                throw new Error("Fallo al reservar");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="product">
            <div className="product-container">
                <div className="productpage-card">
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error.message}</div>}
                    {product && (
                        <>
                            <div className="product-image">
                                <img src={frog} alt="Rana" /> {/* product.image */}
                            </div>
                            <div className="product-info">
                                <h2>{product.name}</h2> 
                                <div className="seller-info">
                                    <p>Vendedor: Karla Ramírez Pulido</p> {/* seller.name */}
                                    <p>Calificación: 5/5</p> {/* seller.calificacion */}
                                </div>
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
                                        <button className="reserve-button" onClick={testHandler}>Apartar</button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {reserved && <WriteReview userId={user.id} productId={productId}/>}
                <Review productId={productId} /> {/* !error &% review */}
            </div>
        </div>
    );

}

export default ProductPage;
