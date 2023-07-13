// Массив с наполнением начальных карточек
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

// Кнопка открытия попапа редактирования профиля
const editingProfileButton = document.querySelector("#editProfileButton");
const addCardButton = document.querySelector('#addCardFormButton');

// Константы для валижациии
const additionCardForm = document.querySelector("#addCardForm");
const editingProfileForm = document.querySelector("#editingProfileForm");

const configuration = {
  formSelector: ".form",
  editingProfileFormId: "editingProfileForm",
  inputSelector: ".form__input",
  invalidInputClass: "form__input_invalid",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorSelector: ".form__error",
};

export {
  cards,
  editingProfileButton,
  addCardButton,
  additionCardForm,
  editingProfileForm,
  configuration
};
