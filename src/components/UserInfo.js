export default class UserInfo {
  constructor({ name, occupation, avatar }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userData = {
      formUserName: this._name.textContent,
      formUserOccupation: this._occupation.textContent,
    };
    return userData;
  }

  setUserInfo({ name, about, avatar }) {
    // принимает данные c сервера и подставляет на страницу
    this._name.textContent = name;
    this._occupation.textContent = about;
    this._avatar.src = avatar;
  }

  changeAvatar(avatar) {
    this._avatar.src = avatar
  }
}
