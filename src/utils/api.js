const baseURL = 'http://localhost:3001';
const token = localStorage.getItem('jwt')
const contentType = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  }
 
export function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
    return fetch(baseURL + '/items').then(checkResponse)
}

function setItems(card) {
  // let token = localStorage.getItem('jwt');
  return fetch(baseURL + '/items', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify({
        _id: card._id,
        name: card.name,
        weather: card.weather,
        imageUrl: card.imageUrl,
      }),
  }).then(checkResponse)
}

function deleteItems(ID) {
    return fetch(baseURL + '/items/' + ID, {
        method: "DELETE"
    }).then(checkResponse)
}

function addCardLike(ID) {
  return fetch(baseURL + '/items/' + ID + "/likes", {
    method: 'PUT',
    headers: contentType,
  }).then(checkResponse)
}

function removeCardLike(ID) {
  return fetch(baseURL + '/items/' + ID + "/likes", {
    method: 'DELETE',
    headers: contentType,
  }).then(checkResponse)
}

export { getItems, setItems, deleteItems, addCardLike, removeCardLike }