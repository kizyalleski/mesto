export default class Card {
  constructor(data, selector, userId, handleCardClick, handleDeliteClick, handleLikeClick) {
    this._link = data.link;
    this._name = data.name;
    this._likeCount = data.likes.length;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._elementSelector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeliteClick = handleDeliteClick;
    this._isLiked = false;
    this._handleLikeClick = handleLikeClick;
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
    this._element.id = this._id;
    this._elementImage = this._element.querySelector(".element__image");
    this._elementName = this._element.querySelector(".element__name");
    this._elementLikes = this._element.querySelector(".element__like-counter");
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikes.textContent = this._likeCount;
    this._trashButton = this._element.querySelector('.element__trash');
    this._setEventListeners();
    this._deleteTrashButton();

    return this._element;
  }

  _toggleLikeState() {
    this._handleLikeClick(this._isLiked, this._id, this._elementLikes);
    this._isLiked = !this._isLiked;
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
      this._handleDeliteClick();
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
    // this._element.remove();
  }

  _openImage() {
    this._handleCardClick(this._link, this._name);
  }

  _deleteTrashButton() {
    if (this._userId !== this._ownerId) {
      this._trashButton.remove();
    }
  }
}
