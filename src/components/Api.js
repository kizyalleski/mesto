export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.token;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  updateUserData({ formUserName, formUserOccupation }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formUserName,
        about: formUserOccupation,
      }),
    }).then(this._handleResponse);
  }

  addNewCard(cardName, cardLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  addLike(imageId) {
    return fetch(`${this._baseUrl}/cards/${imageId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  deleteLike(imageId) {
    return fetch(`${this._baseUrl}/cards/${imageId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._handleResponse);
  }
}
