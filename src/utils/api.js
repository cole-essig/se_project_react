const baseURL = process.env.NODE_ENV === "production" 
  ? "https://api.wtw.crabdance.com"
  : "http://localhost:3001";

function handleHeaders() {
  const token = localStorage.getItem('jwt')

    return {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
    }
}
 
function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function updateProfile(user) {
  return fetch(baseURL + '/users/me', {
    method: 'PATCH',
    headers: handleHeaders(),
    body: JSON.stringify({
        name: user.name,
        avatar: user.avatar,
      }),
  }).then(checkResponse)
}

function getItems() {
    return fetch(baseURL + '/items').then(checkResponse)
}

function setItems(card) {
  return fetch(baseURL + '/items', {
    method: 'POST',
    headers: handleHeaders(),
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
        method: "DELETE",
        headers: handleHeaders(),
    }).then(checkResponse)
}

function addCardLike(ID) {
  return fetch(baseURL + '/items/' + ID + "/likes", {
    method: 'PUT',
    headers: handleHeaders(),
  }).then(checkResponse)
}

function removeCardLike(ID) {
  return fetch(baseURL + '/items/' + ID + "/likes", {
    method: 'DELETE',
    headers: handleHeaders(),
  }).then(checkResponse)
}

export { getItems, setItems, deleteItems, addCardLike, removeCardLike, updateProfile, checkResponse }