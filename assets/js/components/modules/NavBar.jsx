import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import authAPI from "../../services/authAPI";
import AuthContext from "../../context/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";

authAPI.setup();

const NavBar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [user, setUser] = useState(
        authAPI.valueUser()
    );

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        history.push("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/home">CineGest</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/videos">Vidéothèque<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/seances">Séances<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/fiches">Fiches Adhesions<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users">Utilisateur<span className="sr-only">(current)</span></NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/Register" className="btn btn-sm btn-secondary mr-1">
                                    Inscription
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="btn btn-sm btn-success mr-1">
                                    Connexion
                                </NavLink>
                            </li>
                        </>
                    )) || (
                        <>
                            <NavDropdown title={"Bienvenue " + user.firstname + " " + user.lastname} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#/home">Mon Compte</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;