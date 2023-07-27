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
import Api from "../components/Api.js";

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

// Функция создания карточки
const createCard = data => {
  const card = new Card(data, "#elementTemplate", (link, name) => {
    imagePopup.open(link, name);
  });
  return card.generateCard();
};

// Добавление начальных карточек
const cardsSection = new Section(
  {
    items: cards,
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".elements"
);
cardsSection.renderItems();

// добавление новых карточек
const additionCardPopup = new PopupWithForm("#addCardPopup", data => {
  data.link = data.formCardUrl;
  data.name = data.formCardName;
  const newCardElement = createCard(data);
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


////////////// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  token: "adcf1977-5cab-4323-ab2f-1ddbaf1d5d1f"
});

// Начальная подстановка данных пользователя
let userName = document.querySelector('.profile__user-name');
let userOccupation = document.querySelector('.profile__user-occupation');
let userAvatar = document.querySelector('.profile__avatar-image');
let userId = '';
api.getUserData().then(data => {
  userName = data.name;
  userOccupation = data.occupation;
  userAvatar.src = data.avatar;
  userId = data._id;
});
