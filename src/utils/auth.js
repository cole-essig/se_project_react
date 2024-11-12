const baseURL = 'http://localhost:3001';
const contentType = {
    "Content-Type": "application/json",
  }
 
export function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function signup ({ name, avatar, email, password }) {
  return fetch(baseURL + '/users', {
    method: 'POST',
    headers: {
        contentType
    },
    body: JSON.stringify({ name, avatar, email, password })
  })
  .then(checkResponse)
}

function signin ({ name, password }) {
    return fetch(baseURL + '/users', {
      method: 'POST',
      headers: {
          contentType
      },
      body: JSON.stringify({ name, password })
    })
    .then(checkResponse)
  }