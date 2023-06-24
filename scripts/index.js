//////////////////// РАБОТА С ПОПАПАМИ

const popupList = document.querySelectorAll(".popup");
export const imagePopup = document.querySelector("#imagePopup");
export const imagePopupUrl = imagePopup.querySelector(".popup__image");
export const imagePopupName = imagePopup.querySelector(".popup__caption");

// функция открытия попапа
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};

// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};

// функция закрытия попапа при нажатии на кнопку escape
const closePopupEsc = (e) => {
  if (e.key === "Escape" || e.keyCode === 27) {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

// закрытие попапа при клике на керстик или оверлей
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (e.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

//////////////////// ПРОФИЛЬ

const editingProfilePopup = document.querySelector("#editProfilePopup");
const editingProfileButton = document.querySelector("#editProfileButton");
const editingProfileForm = document.querySelector("#editingProfileForm");
const profileUserName = document.querySelector("#profileUserName");
const profileUserOccupation = document.querySelector("#profileUserOccupation");
const userInfoForm = document.forms.userInfoForm;

// функция подстановки значений в форму
function setUserInfoFormFields(form, name, occupation) {
  const userNameInput = form.elements.userNameInput;
  const userOccupationInput = form.elements.userOccupationInput;
  userNameInput.value = name.textContent;
  userOccupationInput.value = occupation.textContent;
}

// нажатие кнопки редактировать профиль
editingProfileButton.addEventListener("click", () => {
  setUserInfoFormFields(userInfoForm, profileUserName, profileUserOccupation);
  openPopup(editingProfilePopup);
  FormValidator.disBtn(editingProfilePopup);
  FormValidator.resetErrorsStyle(editingProfilePopup);
});

// нажатие кнопки сохранить
editingProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserOccupation.textContent = formUserOccupation.value;
  closePopup(editingProfilePopup);
});

//////////////////// КАРТОЧКИ

// Массив объектов с наполнением начальных карточек
const cards = [
  {
    name: "Тбилиси",
    link: "./images/tbilisi.jpg",
  },
  {
    name: "Ереван",
    link: "./images/yerevan.jpg",
  },
  {
    name: "Стамбул",
    link: "./images/istanbul.jpg",
  },
  {
    name: "Казахстан",
    link: "./images/kazakhstan.jpg",
  },
  {
    name: "Узбекистан",
    link: "./images/uzbekistan.jpg",
  },
  {
    name: "Черногория",
    link: "./images/montenegro.jpg",
  },
];

const elements = document.querySelector(".elements");
const renderCard = (cardToRender) => {
  const card = new Card(cardToRender, "#elementTemplate");
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
};

import Card from "./Card.js";

cards.forEach((item) => {
  renderCard(item);
});

// Добавление новых карточек
const additionCardPopup = document.querySelector("#addCardPopup");
const additionCardForm = document.querySelector("#addCardForm");
const additionCardButton = document.querySelector("#addCardFormButton");
const formCardName = document.querySelector("#formCardName");
const formCardUrl = document.querySelector("#formCardUrl");

additionCardButton.addEventListener("click", () => {
  openPopup(additionCardPopup);
  FormValidator.disBtn(additionCardPopup);
  FormValidator.resetErrorsStyle(additionCardPopup);
  FormValidator.resetInputs(additionCardPopup);
});

additionCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    link: formCardUrl.value,
    name: formCardName.value,
  };

  renderCard(newCard);

  closePopup(addCardPopup);
  additionCardForm.reset();
});

//////////////////// ВАЛИДАЦИЯ
const configuration = {
  editingProfileFormId: "editingProfileForm",
  inputSelector: ".form__input",
  invalidInputClass: "form__input_invalid",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
};

import FormValidator from "./FormValidator.js";

const formList = document.querySelectorAll(".form");
formList.forEach((item) => {
  const form = new FormValidator(configuration, item);
  form.enableValidation();
});
