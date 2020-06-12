import '../scss/admin.scss';
const $ = require('jquery');
require('bootstrap');
// listes des imports outils react
import React from 'react';
import ReactDOM from 'react-dom';
// liste des imports composants react

const Login = () => {
    return (
        <main>
            <h1>Login</h1>
        </main>
    )
        ;
};

const rootElement = document.querySelector("#Login");
ReactDOM.render(<Login/>, rootElement);

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');