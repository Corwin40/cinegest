import React, {useState, useEffect} from 'react';
import {Card, Col, Form, Button, Row} from "react-bootstrap";
import usersAPI from "../../../services/Webapp/UsersAPI";
import authAPI from "../../../services/authAPI";
import FichesAPI from "../../../services/Webapp/FichesAPI";
import {toast} from "react-toastify";

const UsersEdit = () => {

    // Récupérer des variables dites en session
    const [user, setUser] = useState(
        authAPI.valueUser()
    );
    const id = user.id;

    // BLOC DE MISE A JOUR USER
    const [userEdit, setUserEdit] = useState({
        firstName:"",
        lastName:"",
        season:"",
    })
    const [userEditErrors, setUserEditErrors] = useState({
        firstName:"",
        lastName:"",
        season:"",
    })
    // Récupération des information à partir de l'id
    const fetchUser = async id => {
        try {
            const {firstName, lastName} = await usersAPI.findOne(id);
            setUserEdit({firstName, lastName});
        } catch (error) {
            console.log(error.response)
        }
    };
    // Charger les données lors du chargement du composant
    useEffect(() => {
        fetchUser(id);
    }, [id]);
    console.log(userEdit);
    // modification des champs du formaulaire
    const handleChangeUserEdit = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setUserEdit({...userEdit, [name]: value})
    }
    // Envoie des données
    const handleSubmitUserEdit = async (event) => {
        try {
            event.preventDefault();
            const response = await usersAPI.updateOne(id, userEdit);
            toast.info("La section a été enregistrée.")
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div className="col-3">

            <Card>
                <Card.Header>
                    <h5>Changer les paramètres de session</h5>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmitUserEdit}>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        <b>Nom</b>
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control
                                            name="firstName"
                                            size="sm"
                                            type="text"
                                            placeholder="FirstName"
                                            value={userEdit.firstName}
                                            onChange={handleChangeUserEdit}
                                            error={userEditErrors.firstName}
                                        />
                                    </Col>
                                    <Col sm="5">
                                        <Form.Control
                                            name="lastName"
                                            size="sm"
                                            type="text"
                                            placeholder="lastName"
                                            value={userEdit.lastName}
                                            onChange={handleChangeUserEdit}
                                            error={userEditErrors.lastName}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Button type="submit" size="sm" variant="outline-warning">Modifier</Button>
                    </Form>
                </Card.Body>
            </Card>


        </div>
    );
};

export default UsersEdit;