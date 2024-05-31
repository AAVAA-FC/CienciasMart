import React from 'react';
import userIcon from '../../../assets/userIcon.svg';
import './Interested.css';

function Interested({ user }) {
    return (
        <div className="interested-card">
            <div className="interested-profile-pic">
                <img src={userIcon} alt="User Icon" />
            </div>
            <div className="interested-content">
                <div className="interested-user">{user}</div>
                <button className="accept-button">Aceptar</button>
            </div>
        </div>
    );
}

export default Interested;
