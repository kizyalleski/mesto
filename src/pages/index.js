// импорт стилей
import "./index.css";
// импорт констант и модулей
import {
  cards,
  editingProfileButton,
  addCardButton,
  configuration,
  editingProfileForm,
  additionCardForm,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";

// ОСНОВНОЙ ФУНКЦИОНАЛ
const userData = new UserInfo({
  name: "#profileUserName",
  occupation: "#profileUserOccupation",
});

// создание объекта попапа информации о пользователе.
// принимает селектор попапа и функцию коллбек сабмита формы,
// подставляющую значения формы на страницу
const profilePopup = new PopupWithForm("#editProfilePopup", (data) => {
  userData.setUserInfo(data);
});

profilePopup.setEventListeners(); // установка всех слушателей
// открытие попама и подстановка значений по умолчанию в форму
editingProfileButton.addEventListener("click", () => {
  profileFormValidator.resetValidation(); // сброс ошибок валидации
  profilePopup.open();
  const userInfo = userData.getUserInfo();
  profilePopup.setInputValues(userInfo); // подстановка значений по умолчанию
});

// создание попапа изображения и установка слушателей
const imagePopup = new PopupWithImage("#imagePopup");
imagePopup.setEventListeners();

// Добавление начальных карточек
const cardsSection = new Section(
  {
    items: cards,
    renderer: (item) => {
      const card = new Card(item, "#elementTemplate", () => {
        imagePopup.open(card._link, card._name);
      });
      return card.generateCard();
    },
  },
  ".elements"
);
cardsSection.renderItems();

// добавление новых карточек
const additionCardPopup = new PopupWithForm("#addCardPopup", data => {
  data.link = data.formCardUrl;
  data.name = data.formCardName;
  const newCard = new Card(data, "#elementTemplate", () => {
    imagePopup.open(newCard._link, newCard._name);
  });
  const newCardElement = newCard.generateCard();
  cardsSection.addItem(newCardElement);
});
additionCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  additionCardPopup.open();
  cardAdditionFormValidator.resetValidation();
});

// ВАЛИДАЦИЯ
const profileFormValidator = new FormValidator(
  configuration,
  editingProfileForm
);
profileFormValidator.enableValidation();

const cardAdditionFormValidator = new FormValidator(
  configuration,
  additionCardForm
);
cardAdditionFormValidator.enableValidation();
