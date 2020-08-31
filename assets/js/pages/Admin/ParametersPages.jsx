import React from "react"

import authAPI from "../../services/authAPI";
import SeasonList from "../Admin/Seasons/SeasonList"

const ParametersPage = () => {

    return (
        <>
        <div className="row">
            <div className="col-12">
                <div className="alert alert-dismissible alert-light">
                    <h1>Espace d'administration de la plateforme</h1>
                </div>
            </div>
        </div>
        <div className="row">
            <SeasonList/>
            <div className="col-4">

            </div>
            <div className="col-4">

            </div>
        </div>
        </>
    );
};

export default ParametersPage;