import "./FeaturedProducts.css";
import frog from "../../../assets/frog.jpeg"
import rana from "../../../assets/r.png"
import { Link } from "react-router-dom";

function FeaturedProducts() { 
    return(
        <div className="featured">
            <div className="featured-container">
                <h2>Destacados</h2>
                <div className="product-list">
                    <Link className="product-card" to="/" onClick={() => console.log("Hola amigos")}>
                        <img src={frog} alt="A frog" />
                        <h3>Ranita </h3>
                        <p>$90</p> 
                    </Link>
                    <div className="product-card">
                        <img src={frog} alt="A frog" />
                        <h3>Guanabana</h3>
                        <p>$90</p>
                    </div>
                    <div className="product-card">
                        <img src={frog} alt="A frog" />
                        <h3>Guanabana</h3>
                        <p>$90</p>
                    </div>
                    <div className="product-card">
                        <img src={frog} alt="A frog" />
                        <h3>Guanabana</h3>
                        <p>$90</p>
                    </div>
                    <div className="product-card">
                        <img src={frog} alt="A frog" />
                        <h3>Guanabana</h3>
                        <p>$90</p>
                    </div>
                    <div className="product-card">
                        <img src={frog} alt="A frog" />
                        <h3>Guanabana</h3>
                        <p>$90</p>
                    </div>
                    <div className="product-card">
                        <img src={frog} alt="A frog" />
                        <h3>Guanabana</h3>
                        <p>$90</p>
                    </div>
                    <div className="product-card">
                        <img src={frog} alt="A frog" />
                        <h3>Guanabana</h3>
                        <p>$90</p>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;