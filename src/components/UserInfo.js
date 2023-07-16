export default class UserInfo {
  constructor({ name, occupation }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
  }

  getUserInfo() {
    const userData = {
      formUserName: this._name.textContent,
      formUserOccupation: this._occupation.textContent,
    };
    return userData;
  }

  setUserInfo({ formUserName, formUserOccupation }) {
    // принимает данные из формы и подставляет на страницу
    this._name.textContent = formUserName;
    this._occupation.textContent = formUserOccupation;
  }
}
