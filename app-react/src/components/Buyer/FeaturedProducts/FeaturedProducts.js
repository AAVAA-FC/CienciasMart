import "./FeaturedProducts.css";
import frog from "../../../assets/frog.jpeg"
import rana from "../../../assets/r.png"
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";

function FeaturedProducts() { 

    const { data: featured, loading, error } = useFetch('http://127.0.0.1:5000/api/products/featured');


    return(
        <div className="featured">
            <div className="featured-container">
                <h2>Destacados</h2>
                <div className="product-list">

                    {error && <h3 className="error-message">Error: {error.message}</h3>}

                    {loading && <h3 className="loading-message">Cargando...</h3>}

                    {featured?.map((product) => (
                        <Link className="product-card" to="/comprar">
                            <img src={frog} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>${product.price}</p> 
                         </Link>
                    ))}

                    {
                       /**
                         <Link className="product-card" to="/comprar">
                        <img src={frog} alt="Rana" />
                        <h3>Rana</h3>
                        <p>$100</p> 
                        <div className="calificacion">
                            <p>Calificacion</p>
                            <p>Pedro Perez</p>
                        </div>
                        </Link>    
                        */
                    }               
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;