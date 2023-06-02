const editingProfilePopup = document.querySelector("#editProfilePopup");
const editingProfileButton = document.querySelector("#editProfileButton");
const editingProfileForm = document.querySelector("#editingProfileForm");
const profileUserName = document.querySelector("#profileUserName");
const profileUserOccupation = document.querySelector("#profileUserOccupation");
const formUserName = document.querySelector("#formUserName");
const formUserOccupation = document.querySelector("#formUserOccupation");
const imagePopup = document.querySelector("#imagePopup");
const cardsSection = document.querySelector(".elements");
const elementTemplate = document.querySelector("#elementTemplate");
const image = imagePopup.querySelector(".popup__image");
const imageName = imagePopup.querySelector(".popup__caption");
const closingPopupButtons = document.querySelectorAll(".popup__close-button");

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");

}

// функция подстановки значений в форму
function setFields() {
  formUserName.value = profileUserName.textContent;
  formUserOccupation.value = profileUserOccupation.textContent;
}

// нажатие кнопки редактировать профиль
editingProfileButton.addEventListener("click", () => {
  setFields();
  openPopup(editingProfilePopup);
});

// функционал закрытия любого попапа крестиком
closingPopupButtons.forEach((button) =>
  button.addEventListener("click", () => closePopup(button.closest(".popup")))
);

// функционал закрытия попапа при клике на оверлей
const popupList = document.querySelectorAll('.popup');
popupList.forEach(popup => {
  popup.addEventListener("mousedown", e => {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(e.target);
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape ' || e.keyCode === 27) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
});

// нажатие кнопки сохранить
editingProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserOccupation.textContent = formUserOccupation.value;
  closePopup(editingProfilePopup);
});

////////////////////////////////

// функция создания карточки
function createNewCard(card) {
  const element = elementTemplate.content.cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementHeading = element.querySelector(".element__name");
  elementImage.setAttribute("src", card.link);
  elementImage.setAttribute("alt", card.name);
  elementHeading.textContent = card.name;
  // функционал удаления карточки
  const trashButton = element.querySelector(".element__trash");
  trashButton.addEventListener("click", (event) => {
    event.target.closest(".element").remove();
  });
  // функционал нажатия на изображение карточки
  const increaseImageButton = element.querySelector(".element__fullscreen");
  increaseImageButton.addEventListener("click", (event) => {
    openImage(event);
  });
  // функционал лайка
  const likeButton = element.querySelector(".element__like");
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("element__like_active");
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
  const imageData = {
    url: event.target.getAttribute("src"),
    caption: event.target.getAttribute("alt"),
  };
  image.setAttribute("src", imageData.url);
  image.setAttribute("alt", "Полная версия изображения " + imageData.caption);
  imageName.textContent = imageData.caption;
  openPopup(imagePopup);
}

// ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК
const additionCardPopup = document.querySelector("#addCardPopup");
const additionCardForm = document.querySelector("#addCardForm");
const additionCardButton = document.querySelector("#addCardButton");

additionCardButton.addEventListener("click", () => {
  openPopup(additionCardPopup);
});

const formCardName = document.querySelector("#formCardName");
const formCardUrl = document.querySelector("#formCardUrl");

additionCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    name: formCardName.value,
    link: formCardUrl.value,
  };
  renderCard(newCard);
  closePopup(addCardPopup);
  formCardName.value = "";
  formCardUrl.value = "";
});
