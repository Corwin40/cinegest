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
import React from 'react';
import ReactDOM from 'react-dom';
// liste des imports composants react
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";



const Admin = () => {
    return (
        <main>
            <h1>Admin</h1>
            <NavBar/>
            <Footer/>
        </main>
)
    ;
};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
