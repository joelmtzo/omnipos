const API_BASE_URL = "http://posv3.test/api/";

async function get(resource) {
    const response = await fetch(API_BASE_URL + resource);
    return response.json();
}

async function getById(resource, id) {
    const response = await fetch(API_BASE_URL + resource + '/' + id);
    return response.json();
}

async function post(resource, data) {
    const response = await fetch(API_BASE_URL + resource, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function deleteById(resource, id) {
    const response = await fetch(API_BASE_URL + resource + '/' + id, {
        method: 'DELETE'
    });
    return response.json();
}

export default { get, getById, post, deleteById };