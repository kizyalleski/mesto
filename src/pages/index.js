// импорт стилей
import './index.css';
// импорт статичных картинок
import logo from '../images/logo.svg';
import avatar from '../images/kusto.jpg';
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

// подстановка статичных картинок
const logoElement = document.querySelector('.header__logo');
logoElement.src = logo;
const avatarElement = document.querySelector('.profile__avatar');
avatarElement.src = avatar;

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
  profileFormValidator.resetValidation();
  profilePopup.open();
  const userInfo = userData.getUserInfo();
  profilePopup._inputs.forEach((input) => {
    input.value = userInfo[input.id];
  });
});

// функция создания попапа изображения
const createImagePopup = (link, name) => {
  const imagePopup = new PopupWithImage("#imagePopup");
  imagePopup.setEventListeners();
  imagePopup.open(link, name);
};

// Добавление начальных карточек
const cardsSection = new Section(
  {
    items: cards,
    renderer: (item) => {
      const card = new Card(item, "#elementTemplate", createImagePopup);
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  ".elements"
);
cardsSection.renderItems();

// добавление новых карточек
const additionCardPopup = new PopupWithForm("#addCardPopup", () => {
  // функция сабмита формы добавления новой карточки
  const newCardData = {
    name: formCardName.value,
    link: formCardUrl.value,
  };
  const newCard = new Card(newCardData, "#elementTemplate", createImagePopup);
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
