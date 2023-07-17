export default class Card {
  constructor(data, selector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._elementSelector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._elementSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementName = this._element.querySelector(".element__name");
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _toggleLikeState() {
    this._likeElement.classList.toggle("element__like_active");
  }

  _setEventListeners() {
    // лайк
    this._likeElement = this._element.querySelector(".element__like");
    this._likeElement.addEventListener("click", () => {
      this._toggleLikeState();
    });
    // удаление карточки
    this._deletionElement = this._element.querySelector(".element__trash");
    this._deletionElement.addEventListener("click", () => {
      this._deleteElement();
    });
    // открытие полной версии картинки
    this._increaseImageButton = this._element.querySelector(
      ".element__fullscreen"
    );
    this._increaseImageButton.addEventListener("click", () => {
      this._openImage();
    });
  }

  _deleteElement() {
    this._element.remove();
  }

  _openImage() {
    this._handleCardClick(this._link, this._name);
  }
}