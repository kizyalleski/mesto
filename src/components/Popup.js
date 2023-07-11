export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    this._closingButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this); // привязка this
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      this.close();
    }
  }

  setEventListeners() {
    this._closingButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (e.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}
