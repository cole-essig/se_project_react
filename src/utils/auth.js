import { checkResponse } from "./api";
const baseURL = 'http://localhost:3001';
const contentType = {
    "Content-Type": "application/json",
  }
 

function signup ({ name, avatar, email, password }) {
  return fetch(baseURL + '/signup', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify({ name, avatar, email, password })
  })
  .then(checkResponse)
}

function signin ({ email, password }) {
    return fetch(baseURL + '/signin', {
      method: 'POST',
      headers: contentType,
      body: JSON.stringify({ email, password })
    })
    .then(checkResponse)
  }

  function checkToken(token) {
    return fetch(baseURL + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    })
    .then(checkResponse)
  }

  export { signin, signup, checkToken }