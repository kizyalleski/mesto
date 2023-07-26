url = "https://mesto.nomoreparties.co/v1/cohort-71";
const token = 'adcf1977-5cab-4323-ab2f-1ddbaf1d5d1f';

export class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    return fetch(url, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});
