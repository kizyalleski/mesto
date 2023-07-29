import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitHandler(this._cardId);

      this.close();
    });
  }
}
