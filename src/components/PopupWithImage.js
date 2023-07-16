import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  open(link, caption) {
    // принимает ссылку на изобр. и подпись к нему, и устанавливает их в попап изображения
    super.open();
    this._image.src = link;
    this._image.alt = caption;
    this._caption.textContent = caption;
  }
}
