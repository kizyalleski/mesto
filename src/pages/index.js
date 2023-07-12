import { cards } from '../utils/constants.js';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
// import Popup from "../components/Popup.js";
import { editingProfileButton } from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

// ПРОФИЛЬ
const userData = new UserInfo({
  name: '#profileUserName',
  occupation: '#profileUserOccupation'
});

// создание объекта попапа информации о пользователе.
// принимает селектор попапа и функцию коллбек сабмита формы,
// подставляющую значения формы на страницу
const profilePopup = new PopupWithForm('#editProfilePopup', (data) => {
  userData.setUserInfo(data);
});

profilePopup.setEventListeners(); // установка всех слушателей
// открытие попама и подстановка значений по умолчанию в форму
editingProfileButton.addEventListener("click", () => {
  profilePopup.open();
  const userInfo = userData.getUserInfo();
  profilePopup._inputs.forEach( input => {
    input.value = userInfo[input.id];
  });
});

// Добавление начальных карточек
const cardsSetion = new Section(
  {
    items: cards,
    renderer: (item) => {
      const card = new Card(item, "#elementTemplate");
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  ".elements"
);
cardsSetion.renderItems();

// инициализациия попапа и картинки и добавление функцианала
export const imagePopup = new PopupWithImage('#imagePopup');
imagePopup.setEventListeners();



//////////////////// РАБОТА С ПОПАПАМИ

// const popupList = document.querySelectorAll(".popup");
// export const imagePopup = document.querySelector("#imagePopup");
// export const imagePopupImage = imagePopup.querySelector(".popup__image");
// export const imagePopupName = imagePopup.querySelector(".popup__caption");

// функция открытия попапа
// export const openPopup = (popup) => {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupEsc);
// };

// функция закрытия попапа
// const closePopup = (popup) => {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closePopupEsc);
// };

// функция закрытия попапа при нажатии на кнопку escape
// const closePopupEsc = (e) => {
//   if (e.key === "Escape" || e.keyCode === 27) {
//     const popup = document.querySelector(".popup_opened");
//     closePopup(popup);
//   }
// };

// закрытие попапа при клике на керстик или оверлей
// popupList.forEach((popup) => {
//   popup.addEventListener("mousedown", (e) => {
//     if (e.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (e.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });





//////////////////// ПРОФИЛЬ

// const editingProfileForm = document.querySelector("#editingProfileForm");
// const profileUserName = document.querySelector("#profileUserName");
// const profileUserOccupation = document.querySelector("#profileUserOccupation");
// const userInfoForm = document.forms.userInfoForm;

// функция подстановки значений в форму
// function setUserInfoFormFields(form, name, occupation) {
//   const userNameInput = form.elements.userNameInput;
//   const userOccupationInput = form.elements.userOccupationInput;
//   userNameInput.value = name.textContent;
//   userOccupationInput.value = occupation.textContent;
// }

// нажатие кнопки редактировать профиль
// editingProfileButton.addEventListener("click", () => {
//   setUserInfoFormFields(userInfoForm, profileUserName, profileUserOccupation);
//   openPopup(editingProfilePopup);
//   profileFormValidator.resetValidation();
// });

// нажатие кнопки сохранить
// editingProfileForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   profileUserName.textContent = formUserName.value;
//   profileUserOccupation.textContent = formUserOccupation.value;
//   closePopup(editingProfilePopup);
// });

//////////////////// КАРТОЧКИ

// функция сброса полей ввода
// const resetInputs = (form) => {
//   form.reset();
// };




// Добавление новых карточек
// const additionCardPopup = document.querySelector("#addCardPopup");
// const additionCardForm = document.querySelector("#addCardForm");
// const additionCardButton = document.querySelector("#addCardFormButton");
// const formCardName = document.querySelector("#formCardName");
// const formCardUrl = document.querySelector("#formCardUrl");

// additionCardButton.addEventListener("click", () => {
//   openPopup(additionCardPopup);
//   cardAdditionFormValidator.resetValidation();
//   resetInputs(additionCardForm);
// });

// additionCardForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const newCard = {
//     link: formCardUrl.value,
//     name: formCardName.value,
//   };

//   renderCard(newCard);

//   closePopup(addCardPopup);
//   additionCardForm.reset();
// });

//////////////////// ВАЛИДАЦИЯ
// const configuration = {
//   formSelector: ".form",
//   editingProfileFormId: "editingProfileForm",
//   inputSelector: ".form__input",
//   invalidInputClass: "form__input_invalid",
//   submitButtonSelector: ".form__submit",
//   inactiveButtonClass: "form__submit_disabled",
//   inputErrorSelector: ".form__error",
// };

// import FormValidator from "../components/FormValidator.js";

// const profileFormValidator = new FormValidator(
//   configuration,
//   editingProfileForm
// );
// profileFormValidator.enableValidation();

// const cardAdditionFormValidator = new FormValidator(
//   configuration,
//   additionCardForm
// );
// cardAdditionFormValidator.enableValidation();
