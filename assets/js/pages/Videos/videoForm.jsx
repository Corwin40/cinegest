import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
// import Bootstrap
import {Modal, Button} from 'react-bootstrap';
import UsersAPI from "../../services/Webapp/UsersAPI";
import VideosAPI from "../../services/Webapp/VideosAPI";
import Field from "../../components/Forms/Fields";


const VideoForm = ({show, onHide, value, history }) => {

    const [editing, setEditing] = useState(false);

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD-MM-YYYY');

    const [video, setVideo] = useState({
        titre: "",
        code:"",
        lettre:"",
        annee:"",
        description:"",
        season:"",
        createat:formatDate(date),
        updateat:formatDate(date)
    });

    const [errors, setErrors] = useState({
        titre: "",
        code:"",
        lettre:"",
        annee:"",
        description:"",
        season:"",
        createat:formatDate(date),
        updateat:formatDate(date)
    });

    useEffect(()=>{
        if(value)
            setEditing(true);
            fetchVideo(value);
    }, [value]);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setVideo({... video, [name]:value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await VideosAPI.updateOne(id, video);
            }else{
                const response = await VideosAPI.newOne(video);
                setErrors({});
                history.replace("/videos");
            }

        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    };

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchVideo = async value =>{
        try{
            const {titre, code, lettre, annee, description, updateAt} = await VideosAPI.findOne(value);
            setVideo({titre, code, lettre, annee, description, updateAt})
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>{!editing && "CREATION D'UNE FICHE VIDEO" || "FICHE DU FILM : " + video.titre }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Field
                        name="titre"
                        label="Titre du film"
                        placeholder="Titre ..."
                        type="text"
                        value={video.titre}
                        onChange={handleChange}
                        error={errors.titre}
                    />
                    <Field
                        name="code"
                        label="Code"
                        placeholder="code ..."
                        type="text"
                        value={video.code}
                        onChange={handleChange}
                        error={errors.code}
                    />
                    <Field
                        name="lettre"
                        label="lettre"
                        placeholder="lettre ..."
                        type="text"
                        value={video.lettre}
                        onChange={handleChange}
                        error={errors.lettre}
                    />
                    <Field
                        name="annee"
                        label="annee"
                        placeholder="annee ..."
                        type="text"
                        value={video.annee}
                        onChange={handleChange}
                        error={errors.annee}
                    />
                    <Field
                        name="description"
                        label="description"
                        placeholder="description ..."
                        type="text"
                        value={video.description}
                        onChange={handleChange}
                        error={errors.description}
                    />
                </Modal.Body>
            <Modal.Footer>
                <div className="form-group">
                    {!editing &&
                    <button className="btn btn-sm btn-success mr-1">Ajouter</button>
                    ||
                    <button className="btn btn-sm btn-success mr-1">Modifier</button>
                    }
                    <Button variant="primary">
                        Retour à la liste
                    </Button>
                </div>
            </Modal.Footer>
        </form>
        </Modal>
    );
};

export default VideoForm;