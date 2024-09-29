const baseURL = 'http://localhost:3001';
const contentType = {
    "Content-Type": "application/json",
  }

function getItems() {
    return fetch(baseURL + '/items').then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
}

function setItems(card) {
  return fetch(baseURL + '/items', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify({
        name: card.name,
        weather: card.weather,
        imageUrl: card.imageUrl,
      }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
})
}

function deleteItems(ID) {
    return fetch(baseURL + '/items/' + ID, {
        method: "DELETE"
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
}

export { getItems, setItems, deleteItems }