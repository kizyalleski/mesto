// импорт стилей
import "./index.css";
// импорт констант и модулей
import {
  buttonEditProfile,
  buttonAddCard,
  buttonChangeAvatar,
  configuration,
  profileEditForm,
  avatarUpdatingForm,
  cardEditionForm,
  changeButtonToSaveState,
  changeButtonToSavingState,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

// API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-71",
  token: "adcf1977-5cab-4323-ab2f-1ddbaf1d5d1f",
});

// ВАЛИДАЦИЯ
const profileFormValidator = new FormValidator(configuration, profileEditForm);
profileFormValidator.enableValidation();

const cardAdditionFormValidator = new FormValidator(
  configuration,
  cardEditionForm
);
cardAdditionFormValidator.enableValidation();

const avatarUpdatingFormValidator = new FormValidator(
  configuration,
  avatarUpdatingForm
);
avatarUpdatingFormValidator.enableValidation();

// ОСНОВНОЙ ФУНКЦИОНАЛ
const userData = new UserInfo({
  name: "#profileUserName",
  occupation: "#profileUserOccupation",
  avatar: ".profile__avatar-image",
});

// создание попапа изображения и установка слушателей
const imagePopup = new PopupWithImage("#imagePopup");
imagePopup.setEventListeners();

// Создания класса Section для добавления карточек в разметку
const cardsSection = new Section({
  renderer: (item) => {
    return createCard(item);
  },
  selector: ".elements",
});

// получение исходных данных: информации от пользователя и начальных карточек
let userId;
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    userData.setUserInfo(userInfo);
    cardsSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// Попап подтверждения удаления карточки
const confirmationPopup = new PopupWithConfirmation(
  "#confirmPopup",
  (e, cardId, card) => {
    e.preventDefault();
    api.deleteCard(cardId)
      .then(() => {
        card.deleteElement();
        confirmationPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
confirmationPopup.setEventListeners();

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
      confirmationPopup.open(card._id, card);
    },
    (isLiked, imageId) => {
      // коллбэк лайка
      (isLiked ? api.deleteLike(imageId) : api.addLike(imageId))
        .then((data) => {
          card.setLikesCount(data.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
  return card.generateCard();
};

// создание объекта попапа информации о пользователе.
// принимает селектор попапа и функцию коллбек сабмита формы
// колбэк обновляет ин-фу на сервере и на странице
const profilePopup = new PopupWithForm("#editProfilePopup", (data) => {
  changeButtonToSavingState(profilePopup);
  api
    .updateUserData(data)
    .then((data) => {
      userData.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonToSaveState(profilePopup);
    });
});

profilePopup.setEventListeners(); // установка всех слушателей
// открытие попама и подстановка значений по умолчанию в форму
buttonEditProfile.addEventListener("click", () => {
  profileFormValidator.resetValidation(); // сброс ошибок валидации
  profilePopup.open();
  const userInfo = userData.getUserInfo();
  profilePopup.setInputValues(userInfo); // подстановка значений по умолчанию
});

// Добавление новой карточки
const additionCardPopup = new PopupWithForm("#addCardPopup", (data) => {
  changeButtonToSavingState(additionCardPopup);
  api
    .addNewCard(data.formCardName, data.formCardUrl)
    .then((data) => {
      const newCardElement = createCard(data);
      cardsSection.addItem(newCardElement);
      additionCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonToSaveState(additionCardPopup);
    });
});
additionCardPopup.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  additionCardPopup.open();
  cardAdditionFormValidator.resetValidation();
});

// Обновление аватара пользователя
const avatarPopup = new PopupWithForm("#updateAvatarPopup", (data) => {
  changeButtonToSavingState(avatarPopup);
  api
    .changeAvatar(data.formAvatarLink)
    .then((data) => {
      userData.changeAvatar(data.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonToSaveState(avatarPopup);
    });
});
avatarPopup.setEventListeners();

buttonChangeAvatar.addEventListener("click", () => {
  avatarUpdatingFormValidator.resetValidation();
  avatarPopup.open();
});
