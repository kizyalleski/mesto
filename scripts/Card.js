export default class Card {
  constructor(data,  selector) {
    this._link = data.link;
    this._name = data.name;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return(cardElement);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }
};
