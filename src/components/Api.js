// url = "https://mesto.nomoreparties.co/v1/cohort-71";
// const token = 'adcf1977-5cab-4323-ab2f-1ddbaf1d5d1f';

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.token;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
  }

  getInitialCards() {
    return fetch(url, {
      headers: {
        authorization: token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  // другие методы работы с API
}
