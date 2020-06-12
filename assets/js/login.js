import '../scss/login.scss';
const $ = require('jquery');
require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};

const rootElement = document.querySelector('#Login');
ReactDOM.render(<Login/>, rootElement);