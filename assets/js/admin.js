/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import '../scss/admin.scss';
const $ =require('jquery');
require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';

const Admin = () => {
    return (
        <div>
            <h1>Admin</h1>
        </div>
)
    ;
};

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
