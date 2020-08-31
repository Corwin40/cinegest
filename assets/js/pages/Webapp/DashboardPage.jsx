import React, {useContext, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import authAPI from "../../services/authAPI";

const DashboardPage = () => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [user, setUser] = useState(
        authAPI.valueUser()
    );
    return (
        <div>
            <div className="alert alert-dismissible alert-light">
                <h1><strong>Bienvenue</strong> sur l'administration de CineGest</h1>
            </div>
            {(!isAuthenticated && (
            <div>
                <p>Vous devez d'abord vous connecter pour utiliser la plateforme</p>
            </div>
            )) || (
            <div>
                <p>A partir de ce Tableau de bord, vous pourrez administrer la vidéothèque, ...</p>
            </div>
            )}
        </div>
    );
};

export default DashboardPage;