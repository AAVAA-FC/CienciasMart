
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSeller from "../HeaderSeller/HeaderSeller";
import './HomeSeller.css';

function HomeSeller() {
    const navigate = useNavigate();

    const handleAddProductClick = () => {
        navigate('/agregar-producto');
    };

    const handleProductPageClick = () => {
        navigate('/product-page');
    };
    

    return (
        <>
            <HeaderSeller />
            <span className='tus-productos'>Productos publicados</span>
            <right>
            <div className="home-seller-container">
                <button className="add-product-button" onClick={handleAddProductClick}>
                    Agregar Producto
                </button>
                <button className="product-page" onClick={ handleProductPageClick}>
                    Prueba product page
                    </button>
            </div></right>
        </>
    );
}
export default HomeSeller;
