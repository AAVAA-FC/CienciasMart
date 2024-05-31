import React from 'react';
import shoppingcart from '../../../assets/shoppingcart.svg';
import userIcon from '../../../assets/userIcon.svg';
import './HeaderSeller.css';

function HeaderSeller() {
    return (
        <>
            <div className="header">
                <div className="logo">
                    <img src={shoppingcart} alt="Cart" className="icon" />
                    <span className="logo-text">CIENCIASMART</span>
                </div>
                <div className="user-icon">
                    <img src={userIcon} alt="User" className="icon" />
                </div>
            </div>
            <div className="yellow-bar"></div>
        </>
    );
}

export default HeaderSeller;
