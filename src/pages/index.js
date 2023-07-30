// импорт стилей
import "./index.css";
// импорт констант и модулей
import {
  // cards,
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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

// ОСНОВНОЙ ФУНКЦИОНАЛ
const userData = new UserInfo({
  name: "#profileUserName",
  occupation: "#profileUserOccupation",
  avatar: ".profile__avatar-image",
});

// создание попапа изображения и установка слушателей
const imagePopup = new PopupWithImage("#imagePopup");
imagePopup.setEventListeners();

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

///////////////////////////////////////////////////
////////////// API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-71",
  token: "adcf1977-5cab-4323-ab2f-1ddbaf1d5d1f",
});

// Начальная подстановка данных пользователя
api.getUserData().then((data) => {
  userData.setUserInfo(data);
});

///////
// Попап подтверждения удаления карточки
const confirmationPopup = new PopupWithConfirmation(
  "#confirmPopup",
  (imageId) => {
    api.deleteCard(imageId).then((data) => {
      console.log(data);
    });
  }
);
confirmationPopup.setEventListeners();

// Получение id пользователя
const userId = (await api.getUserData())._id;

// Получение данных исходных карточек
const initialCards = await api.getInitialCards();

// Функция создания карточки
const createCard = (data) => {
  const card = new Card(
    data,
    "#elementTemplate",
    userId,
    (link, name) => {
      // коллбэк открытия попапа изображения
      imagePopup.open(link, name);
    },
    () => {
      // коллбэк открытия попапа подтврждения удаления карточки
      confirmationPopup.open(data._id);
    },
    (isLiked, imageId) => {
      if (!isLiked) {
        return api.addLike(imageId);
      } else if (isLiked) {
        return api.deleteLike(imageId);
      }
    }
  );
  return card.generateCard();
};

// Добавление начальных карточек
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".elements"
);
cardsSection.renderItems();

// создание объекта попапа информации о пользователе.
// принимает селектор попапа и функцию коллбек сабмита формы
// колбэк обновляет ин-фу на сервере и на странице
const profilePopup = new PopupWithForm("#editProfilePopup", (data) => {
  api.updateUserData(data);
  api.getUserData().then((data) => {
    userData.setUserInfo(data);
  });
});

profilePopup.setEventListeners(); // установка всех слушателей
// открытие попама и подстановка значений по умолчанию в форму
editingProfileButton.addEventListener("click", () => {
  profileFormValidator.resetValidation(); // сброс ошибок валидации
  profilePopup.open();
  const userInfo = userData.getUserInfo();
  profilePopup.setInputValues(userInfo); // подстановка значений по умолчанию
});

// Добавление новой карточки
const additionCardPopup = new PopupWithForm("#addCardPopup", (data) => {
  api.addNewCard(data.formCardName, data.formCardUrl).then((data) => {
    const newCardElement = createCard(data);
    cardsSection.addItem(newCardElement);
  });
});
additionCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  additionCardPopup.open();
  cardAdditionFormValidator.resetValidation();
});
