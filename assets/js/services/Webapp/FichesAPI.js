import axios from 'axios';

function findAll() {
    return axios
        .get("http://localhost:8000/api/cards")                 // Requete en GET
        .then(response => response.data['hydra:member'])              // Filtre la requête Json sur hydra.member de la requête API
}

function findOne(id) {
    return axios
        .get("http://localhost:8000/api/cards/" + id )
        .then(response => response.data);
}
function updateOne(id, card) {
    return axios
        .put("http://localhost:8000/api/cards/" + id, card);
}

function newOne(card) {
    return axios
        .post("http://localhost:8000/api/cards", card);
}

function deleteUsers(id) {
    axios
        .delete("http://localhost:8000/api/cards/" + id)          // Requete en DELETE
}

export default {
    findAll:findAll,
    findOne,
    newOne,
    updateOne,
    delete:deleteUsers
};