import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUserTimes, faSearch} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
// import component
import Pagination from "../../../components/tools/Pagination";
import SeasonsAPI from "../../../services/Webapp/SeasonsAPI";
import Search from "../../../components/Forms/Search";
// Import Bootstrap
import {Button, Card, Form, Modal} from "react-bootstrap";


const seasonsPage = () => {

    // Déclaration des States
    const [seasons, setseasons] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");
    const [row, setRow] = useState( 15);
    const [seasonshow, setseasonshow] = useState(false);
    const [seasonvalue, setseasonvalue] = useState("")

    const [show, setShow] = useState(false);

    const handleDeleteModalClose = () => setShow(false);
    const handleDeleteModalShow = () => setShow(true);
    const handleseasonshowClose = () => setseasonshow(false);
    const handleseasonshowOpen = ({currentTarget}) => {
        setseasonshow(true);
        setseasonvalue(currentTarget.value);
    }


    // récupération des chaque itération sur l'entité User

    const fetchseasons = async () => {
        try {
            const data = await seasonsAPI.findAll();
            setseasons(data);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchseasons();
    }, []);

    // interprétation des dates en fr
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // fonction pour capturer la nouvelle valeur de pagination
    const handleChangePage = page => setCurrentPage(page);

    // Changement du nombre de ligne par résultat

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    return (
        <div className="col-4">

        </div>
    );
};

export default seasonsPage;