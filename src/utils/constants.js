// пути к изображениям для корректной работы webpack
import tbilisi from '../images/tbilisi.jpg';
import yerevan from '../images/yerevan.jpg';
import istanbul from '../images/istanbul.jpg';
import kazakhstan from '../images/kazakhstan.jpg';
import uzbekistan from '../images/uzbekistan.jpg';
import montenegro from '../images/montenegro.jpg';

// Массив с наполнением начальных карточек
const cards = [
  {
    name: "Тбилиси",
    link: tbilisi,
  },
  {
    name: "Ереван",
    link: yerevan,
  },
  {
    name: "Стамбул",
    link: istanbul,
  },
  {
    name: "Казахстан",
    link: kazakhstan,
  },
  {
    name: "Узбекистан",
    link: uzbekistan,
  },
  {
    name: "Черногория",
    link: montenegro,
  },
];

// Кнопка открытия попапа редактирования профиля
const editingProfileButton = document.querySelector("#editProfileButton");
const addCardButton = document.querySelector("#addCardFormButton");

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
  configuration,
};
