import React, { useEffect, useState } from 'react';
import moment from "moment";
import UsersAPI from "../services/Webapp/UsersAPI";
import {Link} from "react-router-dom";

// liste des composants importés
import Pagination from "../components/tools/Pagination";
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserTimes, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Modal, Card } from 'react-bootstrap';
import Search from "../components/Forms/Search";


const DashboardPage = () => {

    // Déclaration des States
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");

    const [show, setShow] = useState(false);

    const handleDeleteModalClose = () => setShow(false);
    const handleDeleteModalShow = () => setShow(true);

    // récupération des chaque itération sur l'entité User

    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    // interprétation des dates en fr
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // BLOC DE PAGINATION

    const itemsPerPage = 10;

    // Moteur de recherche sur la requète
    const filteredUsers = users.filter(
        u =>
            u.firstName.toLowerCase().includes(search.toLowerCase()) ||
            u.lastName.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedUsers = Pagination.getStart(
        filteredUsers,
        currentPage,
        itemsPerPage
    );

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    return (
        <div className="row">
            <div className="col-2">
                <div className="row">
                    <div className="col-12">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>UTILISATEUR</Card.Title>
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
                        <th> <Form.Check disabled/></th>
                        <th>id</th>
                        <th>Nom et Prénom</th>
                        <th>Email</th>
                        <th>Compte actif ?</th>
                        <th>Créer le</th>
                        <th>Modifier le</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedUsers.map(user => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                        <tr key={user.id}>
                            <td><Form.Check /></td>
                            <td>{user.id}</td>
                            <td><Link to={"/users/" + user.id}>{user.firstName} {user.lastName}</Link></td>
                            <td>{user.email}</td>
                            <td>{user.isactive > 0 && <p>Oui</p> || <p>Non</p> }</td>
                            <td>{formatDate(user.createAt)}</td>
                            <td>{formatDate(user.updateAt)}</td>
                            <td>
                                <Link
                                    className="btn btn-xs btn-primary mr-1"
                                    to={"/users/" + user.id}><FontAwesomeIcon icon={faEdit} size="xs" />
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
            </div>

            <Modal show={show} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Attention</Modal.Title>
                </Modal.Header>
                <Modal.Body>Vous êtes sur le point de supprimer l'utilisateur de la base de données.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteModalClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>



    );
};

export default DashboardPage;