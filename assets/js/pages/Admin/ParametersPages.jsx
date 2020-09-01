import React, {useState} from "react"

import authAPI from "../../services/authAPI";
import SeasonList from "../Admin/Seasons/SeasonList"
import UsersEdit from "./Users/UsersEdit";

const ParametersPage = () => {

    const [user, setUser] = useState(
        authAPI.valueUser()
    );

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
            <UsersEdit/>
            <SeasonList/>
            <div className="col-3">

            </div>
        </div>
        </>
    );
};

export default ParametersPage;