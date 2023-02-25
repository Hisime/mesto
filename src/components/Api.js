export class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => res.json())
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => res.json())
  }


  editProfile({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name, about})
    })
      .then(res => res.json());
  }

  addCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({name, link})
    })
      .then(res => res.json());
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => res.json());
  }

  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(res => res.json());
  }

  removeLike(id) {
    return fetch (`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => res.json());
  }

  changeAvatar(avatar) {
    return fetch (`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({avatar})
    })
      .then(res => res.json());
  }
}
