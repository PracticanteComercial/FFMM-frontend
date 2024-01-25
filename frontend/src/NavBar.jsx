import React from 'react';
import LogoImage from './assets/Logo_vector.jpg';
import './CSS/Navbar.css';

function Navbar({ clientNumber } ) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                    <img src={LogoImage} alt="logo vector capital" className="logo-image" />
                    <a className="navbar-brand vector-capital" href="https://www.vectorcapital.cl/">vector capital</a>
                </div>
                <div className="d-flex">
                    <div className="navbar-nav">
                        <p className="nav-link" >Bienvenido {clientNumber}</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="navbar-nav">
                        <a className="nav-link" href="https://portalclientes.vectorcapital.cl/sign-in">Ingresa a tu cuenta</a>
                        <a className="nav-link hazte-cliente" href="https://registro.vectorcapital.cl/(S(smbe1iujhnxha4kzk5xzq5nd))/Views/Index.aspx">Hazte cliente</a>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
