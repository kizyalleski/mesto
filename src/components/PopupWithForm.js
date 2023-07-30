import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".form");
    this._inputs = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__submit");
  }

  _getInputValues() {
    // собирает данные всех полей формы
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  setInputValues(userData) {
    this._inputs.forEach((input) => {
      input.value = userData[input.id];
    });
  }

  setEventListeners() {
    // перезаписывает родительский, добавляя обработчик сабмита
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._renderLoading(true);
      this._submitHandler(this._getInputValues()).finally(() => {
        this._renderLoading(false);
      });
      this.close();
    });
  }

  close() {
    // перезаписывает родительский метод, добавляя ресет полей формы
    super.close();
    this._form.reset();
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      if (this._selector !== '#addCardPopup') {
        this._submitButton.textContent = "Сохранить";
      } else {
        this._submitButton.textContent = "Создать";
      }
    }
  }
}
