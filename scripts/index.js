const editingProfilePopup = document.querySelector("#editProfilePopup");
const editingProfileButton = document.querySelector("#editProfileButton");
const closingEditingProfilePopupButton = document.querySelector("#closeEditProfilePopupButton");
const editingProfileFormSubmitButton = document.querySelector("#editProfileFormSubmitButton");
const profileUserName = document.querySelector("#profileUserName");
const profileUserOccupation = document.querySelector("#profileUserOccupation");
const formUserName = document.querySelector("#formUserName");
const formUserOccupation = document.querySelector("#formUserOccupation");
const imagePopup = document.querySelector("#imagePopup");

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

// добавление на страницу начальных карточек
function createNewCard(card) {
  const elementsSection = document.querySelector('.elements');
  const elementTemplate = document
    .querySelector("#elementTemplate")
    .content.cloneNode(true);
  const elementUrl = elementTemplate.querySelector(".element__image");
  const elementAlt = elementTemplate.querySelector(".element__image");
  const elementHeading = elementTemplate.querySelector(".element__name");
  elementUrl.setAttribute("src", card.url);
  elementAlt.setAttribute("alt", card.heading);
  elementHeading.textContent = card.heading;
  elementsSection.prepend(elementTemplate);
}
cards.forEach(createNewCard);

// ФУНКЦИОНАЛ УДАЛЕНИЯ КАРТОЧКИ
const trashButtons = document.querySelectorAll(".element__trash");
trashButtons.forEach((button) => {
  button.addEventListener("click", function () {
    button.closest(".element").remove();
  });
});

// НАЖАТИЕ НА ИЗОБРАЖЕНИЕ
const increaseImageButtons = document.querySelectorAll(".element__fullscreen");
// функция открытия полной версии изображения
function openImage(event) {
  const image = imagePopup.querySelector(".popup__image");
  const imageData = {
    url: event.target.getAttribute("src"),
    caption:
      event.target.parentElement.nextElementSibling.nextElementSibling
        .firstElementChild.textContent,
  };
  image.setAttribute("src", imageData.url);
  image.nextElementSibling.textContent = imageData.caption;
  openPopup(imagePopup);
}
increaseImageButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    openImage(event);
  });
});
// нажатие кнопки закрытия попапа изображения
const closingImagePopupButton = document.querySelector("#closeImagePopupButton");
closingImagePopupButton.addEventListener("click", () => closePopup(imagePopup));

// ФУНКЦИОНАЛ ЛАЙКА
const likes = document.querySelectorAll(".element__like");
likes.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("element__like_active");
  });
});

// ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК
const additionCardPopup = document.querySelector("#addCardPopup");
const additionCardButton = document.querySelector("#addCardButton");
const closingAdditionCardPopupButton = document.querySelector(
  "#closeAddCardPopupButton"
);

additionCardButton.addEventListener("click", () => {
  openPopup(additionCardPopup);
});

closingAdditionCardPopupButton.addEventListener("click", () => {
  closePopup(additionCardPopup);
});

const additionCardformSubmitButton = document.querySelector(
  "#addCardformSubmitButton"
);
let formCardName = document.querySelector("#formCardName");
let formCardUrl = document.querySelector("#formCardUrl");

additionCardformSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newCard = {
    url: formCardUrl.value,
    alt: "Добавленное изображение",
    heading: formCardName.value,
  };
  createNewCard(newCard);
  closePopup(addCardPopup);
  formCardName.value = "";
  formCardUrl.value = "";

  // добавление функционала новой карточке
  let like = document.querySelector(".element__like");
  like.addEventListener("click", () => {
    like.classList.toggle("element__like_active");
  });

  let trashButton = document.querySelector(".element__trash");
  trashButton.addEventListener("click", () => {
    trashButton.closest(".element").remove();
  });

  let increaseImageButton = document.querySelector(".element__fullscreen");
  increaseImageButton.addEventListener("click", (event) => {
    openImage(event);
  });
});
