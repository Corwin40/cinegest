import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUserTimes, faSearch} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
// import component
import Pagination from "../../components/tools/Pagination";
import VideosAPI from "../../services/Webapp/VideosAPI";
import RowPagination from "../../components/tools/Row_Pagination";
import Search from "../../components/Forms/Search";
import VideoForm from "./videoForm";
// Import Bootstrap
import {Button, Card, Form, Modal} from "react-bootstrap";


const VideosPage = () => {

    // Déclaration des States
    const [videos, setVideos] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");
    const [row, setRow] = useState( 15);
    const [videoshow, setVideoshow] = useState(false);
    const [videovalue, setVideovalue] = useState("")

    const [show, setShow] = useState(false);

    const handleDeleteModalClose = () => setShow(false);
    const handleDeleteModalShow = () => setShow(true);
    const handleVideoshowClose = () => setVideoshow(false);
    const handleVideoshowOpen = ({currentTarget}) => {
        setVideoshow(true);
        setVideovalue(currentTarget.value);
    }


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

    // Changement du nombre de ligne par résultat

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    // BLOC DE PAGINATION
    const itemsPerPage = row;

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
        <>
        <div className="row">
            <div className="col-2">
                <div className="row">
                    <div className="col-12">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>VIDEOTHEQUE</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                            <Search onChange={handleSearch} value={search} />
                    </div>
                </div>
            </div>
            <div className="col-10">
                <table className="table table-sm table-hover">
                    <thead>
                    <tr>
                        <th className="align-middle"> <Form.Check disabled/></th>
                        <th className="align-middle">Id</th>
                        <th className="align-middle">Titre</th>
                        <th className="align-middle">Code</th>
                        <th className="align-middle">Lettre</th>
                        <th className="align-middle">Année</th>
                        <th className="align-middle">Description</th>
                        <th className="align-middle">Filename</th>
                        <th className="align-middle">Saison</th>
                        <th className="align-middle">Créer le</th>
                        <th className="align-middle">Modifier le</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedVideos.map(video => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                        <tr key={video.id}>
                            <td className="align-middle"><Form.Check /></td>
                            <td className="align-middle">{video.id}</td>
                            <td className="align-middle"><Button className="btn-xs" variant="link" onClick={handleVideoshowOpen} value={video.id}>{video.titre}</Button></td>
                            <td className="align-middle">{video.code}</td>
                            <td className="align-middle">{video.lettre}</td>
                            <td className="align-middle">{video.annee}</td>
                            <td className="align-middle">{video.description}</td>
                            <td className="align-middle">{video.filename}</td>
                            <td className="align-middle">{video.season.name}</td>
                            <td className="align-middle">{formatDate(video.createAt)}</td>
                            <td className="align-middle">{formatDate(video.updateAt)}</td>
                            <td className="align-middle">
                                <Link
                                    className="btn btn-xs btn-primary mr-1"
                                    to={"/videos/" + video.id}><FontAwesomeIcon icon={faEdit} size="xs" />
                                </Link>
                                <button
                                    onClick={handleDeleteModalShow}                       // Active la fonction "handleDelete"
                                    className="btn btn-xs btn-danger">
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
        <VideoForm
            show={videoshow}
            onHide={handleVideoshowClose}
            value={videovalue}
        />
        </>
    );
};

export default VideosPage;