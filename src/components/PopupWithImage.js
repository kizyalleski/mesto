import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(selector) {
    super(selector);
  }

  open() {
    // нужно перезаписать родительский метод open, чтобы
    // подставлять в попап ссылку на картинку и
    // ее название
  }
}
