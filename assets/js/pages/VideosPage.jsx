import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUserTimes} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Pagination from "../components/tools/Pagination";
import VideosAPI from "../services/Webapp/VideosAPI";

const VideosPage = () => {

    // Déclaration des States
    const [videos, setVideos] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");

    const [show, setShow] = useState(false);

    const handleDeleteModalClose = () => setShow(false);
    const handleDeleteModalShow = () => setShow(true);

    // récupération des chaque itération sur l'entité User

    const fetchvideos = async () => {
        try {
            const data = await VideosAPI.findAll();
            setVideos(data);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchvideos();
    }, []);

    // interprétation des dates en fr
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // fonction pour capturer la nouvelle valeur de pagination
    const handleChangePage = page => setCurrentPage(page);

    // BLOC DE PAGINATION

    const itemsPerPage = 15;

    // Moteur de recherche sur la requète
    const filteredVideos = videos.filter(
        u =>
            u.titre.toLowerCase().includes(search.toLowerCase()) ||
            u.code.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedVideos = Pagination.getStart(
        filteredVideos,
        currentPage,
        itemsPerPage
    );

    return (
        <div className="row">
            <div className="col-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>VIDEOTHEQUE</Card.Title>
                        <Card.Text>
                            <h1><strong>Bienvenue</strong></h1><hr/>
                            <p>A partir de cette page, vous pouvez ajouter, modifier, supprimer une video de la plateforme ...</p>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-10">
                <table className="table table-sm table-hover">
                    <thead>
                    <tr>
                        <th> <Form.Check disabled/></th>
                        <th>Id</th>
                        <th>Titre</th>
                        <th>Code</th>
                        <th>Lettre</th>
                        <th>Année</th>
                        <th>Description</th>
                        <th>Filename</th>
                        <th>Saison</th>
                        <th>Créer le</th>
                        <th>Modifier le</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedVideos.map(video => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                        <tr key={video.id}>
                            <td><Form.Check /></td>
                            <td>{video.id}</td>
                            <td><Link to={"/videos/" + video.id}>{video.titre}</Link></td>
                            <td>{video.code}</td>
                            <td>{video.lettre}</td>
                            <td>{video.annee}</td>
                            <td>{video.description}</td>
                            <td>{video.filename}</td>
                            <td>{video.season}</td>
                            <td>{formatDate(video.createAt)}</td>
                            <td>{formatDate(video.updateAt)}</td>
                            <td>
                                <Link
                                    className="btn btn-sm btn-primary mr-1"
                                    to={"/videos/" + video.id}><FontAwesomeIcon icon={faEdit} size="xs" />
                                </Link>
                                <button
                                    onClick={handleDeleteModalShow}                       // Active la fonction "handleDelete"
                                    className="btn btn-sm btn-danger">
                                    <FontAwesomeIcon icon={faUserTimes} size="xs" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {itemsPerPage < filteredVideos.length && <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredVideos.length}
                    onPageChanged={handleChangePage}
                />}

            </div>

        </div>
    );
};

export default VideosPage;