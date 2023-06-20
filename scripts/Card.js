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

    this._setEventListeners();

    return this._element;
  }

  _toggleLikeState() {
    this._likeElement.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    // лайк
    this._likeElement = this._element.querySelector('.element__like');
    this._likeElement.addEventListener('click', () => {
      this._toggleLikeState();
    });
    // удаление карточки
    this._deletionElement = this._element.querySelector('.element__trash');
    this._deletionElement.addEventListener('click', () => {
      this._deleteElement();
    });
  }

  _deleteElement() {
    this._element.remove();
  }
};
