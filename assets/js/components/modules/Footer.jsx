import React from 'react';
import {faCopyright} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <p><FontAwesomeIcon icon={faCopyright}/> 2020 - OpenPixl</p>
            </div>
        </footer>
    );
}

export default Footer;