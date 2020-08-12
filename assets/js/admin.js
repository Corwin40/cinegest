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

// liste des imports composants react
import NavBar from "./components/modules/NavBar";
import Footer from "./components/modules/Footer";
import UsersPage from "./pages/UsersPage";
import VideosPage from "./pages/Videos/VideosPage";
import DashboardPage from "./pages/DashboardPage";
import ListSeances from "./pages/Seances/ListSeances";
import authAPI from "./services/authAPI";
import AuthContext from "./context/AuthContext";

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
                        <Route path="/seances" component={ListSeances} />

                        <Route path="/videos" component={VideosPage} />
                        <Route path="/users" component={UsersPage} />
                        <Route path="/" component={DashboardPage} />
                    </Switch>
                </div>
                <Footer/>
            </main>
        </HashRouter>
        </AuthContext.Provider>
);

};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
