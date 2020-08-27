import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUserTimes, faPlusCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
// import component
import Pagination from "../../components/tools/Pagination";
import FichesAPI from "../../services/Webapp/FichesAPI";
import {toast} from "react-toastify";
import RowPagination from "../../components/tools/Row_Pagination";
import Search from "../../components/Forms/Search";
// Import Bootstrap
import {Button, Card, Form, Modal, Col, Row} from "react-bootstrap";


const fichesPage = () => {
    // interprétation des dates en fr
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // Déclaration des States
    const [fiches, setFiches] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [addFiches, setAddFiches] = useState({
        title : 'nouvelle fiche',
        status :'en cours de validation'
    })
    const [search, setSearch] = useState("");
    const [row, setRow] = useState( 15);
    const [ficheshow, setFicheshow] = useState(false);
    const [ficheDeleteShow, setFicheDeleteShow] = useState(false);
    const [fichevalue, setFichevalue] = useState("")

    const [show, setShow] = useState(false);

    const handleficheshowClose = () => setFicheshow(false);
    const handleficheshowOpen = ({currentTarget}) => {
        setFicheshow(true);
        setFichevalue(currentTarget.value);
    }

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    // BLOC POUR LISTER LES FICHES
   // récupération des chaque itération sur l'entité User
    const fetchFiches = async () => {
        try {
            const data = await FichesAPI.findAll();
            setFiches(data);
        } catch (error) {
            console.log(error.response)
        }
    };
    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchFiches();
    }, []);

    // fonction pour capturer la nouvelle valeur de pagination
    const handleChangePage = page => setCurrentPage(page);

    // Pagination
    const itemsPerPage = row;

    // Moteur de recherche sur la requète
    const filteredfiches = fiches.filter(
        f =>
            f.title.toLowerCase().includes(search.toLowerCase()) ||
            f.status.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedfiches = Pagination.getStart(
        filteredfiches,
        currentPage,
        itemsPerPage
    );


    // BLOC POUR CREATION DE FICHE
    // Bouton de validation pour l'ajout d'une section
    const handleSubmitAddFiche = async (event) => {
        event.preventDefault();
        const response = await FichesAPI.newOne(addFiches);
        toast.info("La nouvelle <b>Fiche</b> a été enregistrée.")
        const newData = await FichesAPI.findAll();
        setFiches(newData);
    }


    // BLOC POUR MISE A JOUR DE FICHE
    const [ficheUpdate, setFicheUpdate] = useState({
        title:"",
        adress:"",
        complement:"",
        zipcode:"",
        city:"",
        status:"",
        phone:"",
        email:""
    });
    const [ficheUpdateErrors, setFicheUpdateErrors] = useState({
        title:"",
        adress:"",
        complement:"",
        zipcode:"",
        city:"",
        status:"",
        phone:"",
        email:""
    });
    // Modal de mise à jour d'une Fiche (avec ouverture et fermeture)
    const [fichesUpdateShow, setFichesUpdateShow] = useState(false);
    const handleFichesUpdateClose = () => setFichesUpdateShow(false);
    const handleFichesUpdateOpen = (fiche) => {
        setFichesUpdateShow(true);
        setFicheUpdate(fiche);
    }
    // Mise à jour des champs
    const handleChangeFicheUpdate =({currentTarget})=>{
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setFicheUpdate({...ficheUpdate, [name]: value})
    }
    // Envoie et validation du formulaire de mise à jour d'une fiche
    const handleSubmitFicheUpdate = async (event) => {
        event.preventDefault();
        let id = ficheUpdate.id
        const response = await FichesAPI.updateOne(id, ficheUpdate);
        toast.info("La section a été enregistrée.")
        setFichesUpdateShow(false);
        const newData = await FichesAPI.findAll();
        setFiches(newData);
    }


    // BLOC POUR LA SUPPRESSION D'UNE FICHE
    const [ficheDelete, setFicheDelete] = useState([]);
    // Ouverture de la modale
    const handleFichesDeleteShow = (fiche) => {
        setFicheDelete(fiche);
        setFicheDeleteShow(true);
    }
    // Fermeture de la modale
    const handleFichesDeleteClose = () => setFicheDeleteShow(false);
    // Mise en place de la fonction de suppression d'une section
    const handleFicheDelete = async id => {
        const originalFiches = [...fiches];                        // copie du tableau des sections
        setFiches(fiches.filter(fiche => fiche.id !== id));
        setFicheDeleteShow(false);
        try {
            await FichesAPI.delete(id);
        }catch(error){
            setFiches(originalFiches);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-2">
                    <div className="row">
                        <div className="col-12">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Les FICHES</Card.Title>
                                        <Form onSubmit={handleSubmitAddFiche}>
                                            <Button type="submit" variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPlusCircle}/> Sections</Button>
                                        </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="row" id="blocRecherche">
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
                            <th></th>
                            <th className="align-middle">Titre</th>
                            <th className="align-middle">Adhesion</th>
                            <th className="align-middle">Status</th>
                            <th className="align-middle">Créer le</th>
                            <th className="align-middle">Modifier le</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedfiches.map(fiche => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                            <tr key={fiche.id}>
                                <td className="align-middle"><Form.Check /></td>
                                <td className="align-middle">{fiche.id}</td>
                                <td className="align-middle">
                                    <Button
                                        variant="link"
                                        onClick={()=>handleFichesUpdateOpen(fiche)}
                                        value={fiche.id}
                                    >
                                    {fiche.title}
                                    </Button>
                                </td>
                                <td className="align-middle">type d'adhesion</td>
                                <td className="align-middle">{fiche.status}</td>
                                <td className="align-middle">{formatDate(fiche.createAt)}</td>
                                <td className="align-middle">{formatDate(fiche.updateAt)}</td>
                                <td className="align-middle">
                                    <Button
                                        onClick={() => handleFichesUpdateOpen(fiche)}
                                        className="btn btn-xs btn-primary mr-1"
                                        >
                                        <FontAwesomeIcon icon={faEdit} size="xs" />
                                    </Button>
                                    <button
                                        onClick={() => handleFichesDeleteShow(fiche)}                       // Active la fonction "handleDelete"
                                        className="btn btn-xs btn-danger">
                                        <FontAwesomeIcon icon={faUserTimes} size="xs" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {itemsPerPage < filteredfiches.length && <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredfiches.length}
                        onPageChanged={handleChangePage}
                    />}
                </div>
            </div>
            <Modal
                size="lg"
                id="ModalFicheUpdate"
                show={fichesUpdateShow}
                onHide={handleFichesUpdateClose}
                centered
            >
                <Form onSubmit={handleSubmitFicheUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Mettre à jour une fiche</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Col>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label size="sm" column sm="2">
                                    <b>Titre :</b>
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control
                                        name="title"
                                        size="sm"
                                        type="text"
                                        placeholder="Titre"
                                        value={ficheUpdate.title}
                                        onChange={handleChangeFicheUpdate}
                                        error={ficheUpdateErrors.title}
                                    />
                                </Col>
                                <Col sm="5">
                                    <Form.Control
                                        name="status"
                                        size="sm"
                                        type="text"
                                        placeholder="status"
                                        value={ficheUpdate.status}
                                        onChange={handleChangeFicheUpdate}
                                        error={ficheUpdateErrors.status}
                                    />
                                </Col>
                            </Form.Group>
                            <hr/>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <h5>Adresse :</h5>
                            <hr/>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label size="sm" column sm="0">
                                </Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        name="adress"
                                        size="sm"
                                        type="text"
                                        placeholder="Adresse ..."
                                        value={ficheUpdate.adress}
                                        onChange={handleChangeFicheUpdate}
                                        error={ficheUpdateErrors.adress}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label size="sm" column sm="0">
                                </Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        name="complement"
                                        size="sm"
                                        type="text"
                                        placeholder="complement ..."
                                        value={ficheUpdate.complement}
                                        onChange={handleChangeFicheUpdate}
                                        error={ficheUpdateErrors.complement}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label size="sm" column sm="0">
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control
                                        name="zipcode"
                                        size="sm"
                                        type="text"
                                        placeholder="CP ..."
                                        value={ficheUpdate.zipcode}
                                        onChange={handleChangeFicheUpdate}
                                        error={ficheUpdateErrors.zipcode}
                                    />
                                </Col>
                                <Col sm="9">
                                    <Form.Control
                                        name="city"
                                        size="sm"
                                        type="text"
                                        placeholder="Ville ..."
                                        value={ficheUpdate.city}
                                        onChange={handleChangeFicheUpdate}
                                        error={ficheUpdateErrors.city}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <h5>Contacts</h5>
                            <hr/>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label size="sm" column sm="0">
                                </Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        name="tel"
                                        size="sm"
                                        type="text"
                                        placeholder="Téléphone de contact ..."
                                        value={ficheUpdate.phone}
                                        onChange={handleChangeFicheUpdate}
                                        error={ficheUpdateErrors.phone}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label size="sm" column sm="0">
                                </Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        name="email"
                                        size="sm"
                                        type="text"
                                        placeholder="Email de contact ..."
                                        value={ficheUpdate.email}
                                        onChange={handleChangeFicheUpdate}
                                        error={ficheUpdateErrors.email}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <div className="float-left"><h5>Membres</h5></div>
                            <div className="float-right"><FontAwesomeIcon size="lg" icon={faPlusCircle} /></div>
                        </Col>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleFichesUpdateClose}>
                        Annuler
                    </Button>
                    <Button type="submit" size="sm" variant="outline-warning">Modifier</Button>
                </Modal.Footer>
                </Form>
            </Modal>
            <Modal id="ModalFicheDelete" border="warning" show={ficheDeleteShow} onHide={handleFichesDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression d'une fiche</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="alert alert-danger"><b>Attention</b></h4>
                    Vous êtes sur le point de supprimer la section : <b>{ficheDelete.title}</b><br/>
                    Tous les adherents liés à cette fiche seront supprimés.
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="secondary" onClick={handleFichesDeleteClose}>
                        Annuler
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleFicheDelete(ficheDelete.id)}
                    >
                        Suppression
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default fichesPage;