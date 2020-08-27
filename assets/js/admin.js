/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import '../scss/admin.scss';
const $ =require('jquery');
require('bootstrap');

// listes des imports outils react
import React, { useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// liste des imports composants react
import NavBar from "./components/modules/NavBar";
import Footer from "./components/modules/Footer";
import UsersPage from "./pages/UsersPage";
import VideosPage from "./pages/Videos/VideosPage";
import DashboardPage from "./pages/DashboardPage";
import ListSeances from "./pages/Seances/ListSeances";
import FichesList from "./pages/Adhesions/FichesList";
import authAPI from "./services/authAPI";
import AuthContext from "./context/AuthContext";
import PrivateRoute from "./components/tools/PrivateRoute";
import LoginPage from "./pages/Admin/LoginPage";
import RegisterForm from "./pages/Admin/Register";

// Accès au service de connexion sécurisée
authAPI.setup();

const Admin = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        authAPI.isAuthenticated()
    );

    const NavBarWithRouter = withRouter(NavBar);

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated
        }}>
        <HashRouter>
            <main>
                <NavBarWithRouter/>
                <div className="container-fluid pt-3">
                    <Switch>

                        <PrivateRoute path="/fiches" component={FichesList} />
                        <PrivateRoute path="/seances" component={ListSeances} />
                        <PrivateRoute path="/videos" component={VideosPage} />
                        <PrivateRoute path="/users" component={UsersPage} />

                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/" component={DashboardPage} />

                    </Switch>
                </div>
                <Footer/>
            </main>
        </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
        </AuthContext.Provider>
);

};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);
