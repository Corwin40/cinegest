import React, { useEffect, useState } from 'react';
import moment from "moment";
import UsersAPI from "../services/Webapp/UsersAPI";
import {Link} from "react-router-dom";

// liste des composants importés
import Pagination from "../components/tools/Pagination";
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { Form, Button } from 'react-bootstrap';


const DashboardPage = () => {

    // Déclaration des States
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");

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

    return (
        <div>
            <div className="alert alert-dismissible alert-light">
                <h1><strong>Bienvenue</strong> sur la page des utilisateurs de la plateforme</h1><hr/>A partir de cette page, vous pouvez ajouter, modifier, supprimer un utilisateur de la plateforme ...
            </div>

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
                        <td></td>
                        <td>{user.id}</td>
                        <td><Link to={"/users/" + user.id}>{user.firstName} {user.lastName}</Link></td>
                        <td>{user.email}</td>
                        <td>{user.isactive > 0 && <p>Oui</p> || <p>Non</p> }</td>
                        <td>{formatDate(user.createAt)}</td>
                        <td>{formatDate(user.updateAt)}</td>
                        <td>
                            <Link
                                className="btn btn-sm btn-primary mr-1"
                                to={"/users/" + user.id}><FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <button
                                onClick={() => handleDelete(user.id)}                       // Active la fonction "handleDelete"
                                className="btn btn-sm btn-danger">
                                <FontAwesomeIcon icon={faUserTimes} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>



    );
};

export default DashboardPage;