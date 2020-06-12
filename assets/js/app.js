
import '../scss/app.scss';
const $ = require('jquery');
require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <div>
            <h1>app</h1>
        </div>
    );
};

const rootElement = document.querySelector("#App");
ReactDOM.render(<App/>, rootElement);


console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
