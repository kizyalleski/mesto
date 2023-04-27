const editingProfilePopup = document.querySelector("#editProfilePopup");
const editingProfileButton = document.querySelector("#editProfileButton");
const closingEditingProfilePopupButton = document.querySelector("#closeEditProfilePopupButton");
const editingProfileFormSubmitButton = document.querySelector("#editProfileFormSubmitButton");
const profileUserName = document.querySelector("#profileUserName");
const profileUserOccupation = document.querySelector("#profileUserOccupation");
const formUserName = document.querySelector("#formUserName");
const formUserOccupation = document.querySelector("#formUserOccupation");
const imagePopup = document.querySelector("#imagePopup");
const cardsSection = document.querySelector('.elements');
const elementTemplate = document.querySelector("#elementTemplate");


// функция открытия попапа
function openPopup(popup) {
  formUserName.value = profileUserName.textContent; // подстановка значений из основной страницы в попап
  formUserOccupation.value = profileUserOccupation.textContent;
  popup.classList.add("popup_opened");
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// нажатие кнопки редактировать профиль
editingProfileButton.addEventListener("click", () => {
  openPopup(editingProfilePopup);
});

// нажатие кнопки закрытыя редактирования профия
closingEditingProfilePopupButton.addEventListener("click", () => {
  closePopup(editingProfilePopup);
});

// нажатие кнопки сохранить
editingProfileFormSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserOccupation.textContent = formUserOccupation.value;
  closePopup(editingProfilePopup);
});

////////////////////////////////

// функция создания карточки
function createNewCard(card) {
  const element = elementTemplate.content.cloneNode(true);
  const elementUrl = element.querySelector(".element__image");
  const elementAlt = element.querySelector(".element__image");
  const elementHeading = element.querySelector(".element__name");
  elementUrl.setAttribute("src", card.url);
  elementAlt.setAttribute("alt", card.heading);
  elementHeading.textContent = card.heading;
  // функционал удаления карточки
  const trashButton = element.querySelector('.element__trash');
  trashButton.addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  // функционал нажатия на изображение карточки
  const increaseImageButton = element.querySelector('.element__fullscreen');
  increaseImageButton.addEventListener('click', (event) => {
    openImage(event);
  });
  // нажатие кнопки закрытия попапа изображения
  const closingImagePopupButton = document.querySelector("#closeImagePopupButton");
  closingImagePopupButton.addEventListener('click', () => closePopup(imagePopup));
  // функционал лайка
  const likeButton = element.querySelector('.element__like');
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('element__like_active');
  });
  return element;
}
// функция добавления карточки на страницу
function renderCard(card) {
  cardsSection.prepend(createNewCard(card));
}
// добавление начальных карточек
cards.forEach(renderCard);

function openImage(event) {
  const image = imagePopup.querySelector(".popup__image");
  const name = imagePopup.querySelector('.popup__caption');
  const imageData = {
    url: event.target.getAttribute("src"),
    caption: event.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.textContent,
  };
  image.setAttribute("src", imageData.url);
  name.textContent = imageData.caption;
  openPopup(imagePopup);
}


// ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК
const additionCardPopup = document.querySelector("#addCardPopup");
const additionCardButton = document.querySelector("#addCardButton");
const closingAdditionCardPopupButton = document.querySelector("#closeAddCardPopupButton");

additionCardButton.addEventListener("click", () => {
  openPopup(additionCardPopup);
});

closingAdditionCardPopupButton.addEventListener("click", () => {
  closePopup(additionCardPopup);
});

const additionCardFormSubmitButton = document.querySelector(
  "#addCardFormSubmitButton"
);
let formCardName = document.querySelector("#formCardName");
let formCardUrl = document.querySelector("#formCardUrl");

additionCardFormSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newCard = {
    url: formCardUrl.value,
    alt: "Добавленное изображение",
    heading: formCardName.value,
  };
  renderCard(newCard);
  closePopup(addCardPopup);
  formCardName.value = "";
  formCardUrl.value = "";
});
