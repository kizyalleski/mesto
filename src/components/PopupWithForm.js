import Popup from './Popup.js';

export default class PopupWithForm {
  constructor(selector, submitCallback) {
    super(selector);
  }

  _getInputValues() {
    // собирает данные всех полей формы
  }

  setEventListeners() {
    // перезаписывает родительский,
    // добавляя обработчик сабмита
  }

  close() {
    // перезаписывает родительский метод,
    // добавляя ресет полей формы
  }
}
