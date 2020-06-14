import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/videos")                 // Requete en GET
        .then(response => response.data['hydra:member'])              // Filtre la requête Json sur hydra.member de la requête API
}

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/videos/" + id )
        .then(response => response.data);
}
function updateOne(id, video) {
    return axios
        .put("http://localhost:8000/api/videos/" + id, video);
}

function newOne(video) {
    return axios
        .post("http://localhost:8000/api/videos", video);
}

function deleteUsers(id) {
    axios
        .delete("http://localhost:8000/api/videos/" + id)          // Requete en DELETE
}

export default {
    findAll:findAll,
    findOne,
    newOne,
    updateOne,
    delete:deleteUsers
};