import React, { useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router";
import HeaderBuyer from "../HeaderBuyer/HeaderBuyer";
import "./ProductPage.css";
import { Link } from "react-router-dom";
import frog from "../../../assets/frog.jpeg"

function ProductPage() {
    const { productId } = useParams();
    const { data: product, loading, error} = useFetch(`http://127.0.0.1:5000/api/products/${productId}`);

    return(
        <div className="product">
            <div className="product-container">
               <div className="productpage-card">
                <div className="product-image">
                    <img src={frog} alt="Rana" /> {/** product.image */}
                </div>
                <div className="product-info">
                    <h2>Monedero de ranita</h2> {/** product.name */}
                    <div className="seller-info">
                        <p>Vendedor: Karla Ramírez Pulido</p> {/** seller.name */}
                        <p>Calificación</p> {/** seller.calificacion */}
                    </div>
                    <p className="description">
                    ¡Dale un toque de encanto y diversión a tu estilo con nuestro adorable monedero en forma de ranita!
                     Este encantador accesorio no solo es funcional, sino que también es una declaración de moda que seguramente
                     te hará destacar entre la multitud. Confeccionado con materiales de alta calidad y un diseño meticulosamente detallado, 
                     este monedero es perfecto para llevar tus monedas, billetes pequeños y tarjetas de una manera lúdica y original. 
                     Su tamaño compacto lo convierte en el compañero ideal para tus aventuras diarias, ya sea que estés corriendo entre 
                     reuniones o explorando la ciudad. {/** product.description */}
                    </p>

                    <div className="request-product">
                        <button> Apartar </button>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
}

export default ProductPage;