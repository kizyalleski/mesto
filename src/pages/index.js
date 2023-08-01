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

// получение исходных данных: информации от пользователя и начальных карточек
const [userInfo, initialCards] = await Promise.all([
  api.getUserData().catch((err) => {
    console.log(err);
  }),
  api.getInitialCards().catch((err) => {
    console.log(err);
  }),
]);
const userId = userInfo._id;
// установка начальных данных пользователя
userData.setUserInfo(userInfo);

// Попап подтверждения удаления карточки
const confirmationPopup = new PopupWithConfirmation("#confirmPopup");
confirmationPopup.setEventListeners();

// функция для снятия слушателя после закрытия попапа удаления карточки
const handleCardDelete = (e, cardId, card) => {
  e.preventDefault();
  api
    .deleteCard(cardId)
    .then(() => {
      card.deleteElement();
      confirmationPopup.close();
      confirmationPopup.form.removeEventListener("submit", handleCardDelete);
    })
    .catch((err) => {
      console.log(err);
    });
};

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
      confirmationPopup.form.addEventListener("submit", (e) => {
        handleCardDelete(e, data._id, card);
      });
    },
    (isLiked, imageId, likeCount, likeElement) => {
      // коллбэк лайка
      (isLiked ? api.deleteLike(imageId) : api.addLike(imageId))
        .then((data) => {
          likeCount.textContent = data.likes.length;
          likeElement.classList.toggle("element__like_active");
          card._isLiked = !isLiked;
        })
        .catch((err) => {
          console.log(err);
        });
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
  changeButtonToSavingState(profilePopup);
  api.updateUserData(data)
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

buttonChangeAvatar.addEventListener("click", () => {
  avatarUpdatingFormValidator.resetValidation();
  avatarPopup.setEventListeners();
  avatarPopup.open();
});
