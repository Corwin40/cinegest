import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/seasons")                 // Requete en GET
        .then(response => response.data['hydra:member'])              // Filtre la requête Json sur hydra.member de la requête API
}

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/seasons/" + id )
        .then(response => response.data);
}
function updateOne(id, season) {
    return axios
        .put("http://localhost:8000/api/seasons/" + id, season);
}

function newOne(season) {
    return axios
        .post("http://localhost:8000/api/seasons", season);
}

function deleteUsers(id) {
    axios
        .delete("http://localhost:8000/api/seasons/" + id)          // Requete en DELETE
}

export default {
    findAll:findAll,
    findOne,
    newOne,
    updateOne,
    delete:deleteUsers
};