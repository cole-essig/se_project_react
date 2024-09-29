const baseURL = 'http://localhost:3001';

function getItems() {
    return fetch(baseURL + '/items').then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
}

export { getItems }