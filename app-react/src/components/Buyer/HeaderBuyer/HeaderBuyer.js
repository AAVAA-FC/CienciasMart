import React from 'react';
import './HeaderBuyer.css'; 
import cart from '../../../assets/shoppingcart.svg';
import shopping from '../../../assets/cartshopping.svg';
import usericon from '../../../assets/userIcon.svg'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

function HeaderBuyer() {

    const categories = ["Libros", "Ropa", 
                        "Comida", "Deportivo",
                        "Juguetes", "Papelería", 
                        "Hogar", "Mascotas"];

    const { logout } = useAuth();
    
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const buttonHandler = () => {
        console.log(showUserMenu);
    }
    
    return (
        <div>
            
            <header className="header">
                
                <div className="left">
                    <button className="logo-btn">
                        <img src={cart} alt="CiencaSmart Logo" className="logo" />
                        <span className="app-name">CIENCIASMART</span>
                    </button>
                </div>
            
                <div className="middle">
                    <input type="text" placeholder="Buscar productos..." className="search-bar" />
                </div>
        
                <div className="right">
                    <button className="user-btn" onClick={() => logout()}>
                        <img src={usericon} alt="User Icon" className="icon" />
                    </button>

                   {
                    /** 
                     <ul className="floating-list">
                     <li>Item 1</li>
                     <li>Item 2</li>
                     <li>Item 3</li>
                    </ul>*/
                   }

                    <button className="cart-btn" onClick={buttonHandler}>
                        <img src={shopping} alt="Shopping Cart Icon" className="icon" />
                    </button>
                </div>
            </header>

            {
                /**
                 * <div className={`user-menu ${showUserMenu ? 'show' : ''}`} onClick={toggleUserMenu}>
                        <ul>
                            <li>Dummy Option 1</li>
                            <li>Dummy Option 2</li>
                            <li>Dummy Option 3</li>
                        </ul>
                    </div>
                 */
            }
            

            <div className="categories">
                {categories.map((category) => (
                    <Link key={category} to="/" className="link-style">{category}</Link>
                ))}
            </div>
            
        </div>
    );
}

export default HeaderBuyer;
