import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    // собирает данные всех полей формы
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.id] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    // перезаписывает родительский, добавляя обработчик сабмита
    super.setEventListeners();
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    // перезаписывает родительский метод, добавляя ресет полей формы
    super.close();
    this._form.reset();
  }
}
