import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this.form = this._popup.querySelector(".form");
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (e) => {
      this._submitHandler(e, this._cardId, this._card);
    });
  }
}
