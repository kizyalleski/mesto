const editProfilePopup = document.querySelector("#editProfilePopup");
const editProfileButton = document.querySelector("#editProfileButton");
const closePopupButton = document.querySelector("#closePopupButton");
const formSubmitButton = document.querySelector("#formSubmitButton");
const profileUserName = document.querySelector("#profileUserName");
const profileUserOccupation = document.querySelector("#profileUserOccupationn");
const formUserName = document.querySelector("#formUserName");
const formUserOccupation = document.querySelector("#formUserOccupation");
const likeButton = document.querySelectorAll(".element__like"); // массив кнопок

// функция открытия попапа
function openPopup(popup) {
  formUserName.value = profileUserName.textContent; // подстановка значений из основной страницы в попап
  formUserOccupation.value = profileUserOccupation.textContent;
  popup.classList.add("popup_opened");
}

// функция закрытия попапа
function closePoup(popup) {
  popup.classList.remove("popup_opened");
}

// нажатие кнопки редактировать профиль
editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
});

// нажатие кнопки закрытыя редактирования профия
closePopupButton.addEventListener("click", function () {
  closePoup(editProfilePopup);
});

// нажатие кнопки сохранить
formSubmitButton.addEventListener("click", function () {
  event.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserOccupation.textContent = formUserOccupation.value;
  closePoup(editProfilePopup);
});

////////////////////////////////

// Объект с наполнением начальных карточек
const initialCards = [
  {
    url: "./images/tbilisi.jpg",
    alt: "Вид на Тбилиси",
    heading: "Тбилиси",
  },
  {
    url: "./images/yerevan.jpg",
    alt: "Вид на Ереван",
    heading: "Ереван",
  },
  {
    url: "./images/istanbul.jpg",
    alt: "Вид на Стамбул",
    heading: "Стамбул",
  },
  {
    url: "./images/kazakhstan.jpg",
    alt: "Вид на Казахстан",
    heading: "Казахстан",
  },
  {
    url: "./images/uzbekistan.jpg",
    alt: "Площадь Регистан в Узбекистане",
    heading: "Узбекистан",
  },
  {
    url: "./images/montenegro.jpg",
    alt: "Которский замок на фоне гор и акватории",
    heading: "Черногория",
  },
];

const elements = document.querySelector("#elements");
initialCards.forEach((card) => {
  const elementTemplate = document.querySelector('#elementTemplate').content.cloneNode(true);
  const elementUrl = elementTemplate.querySelector('.element__image').setAttribute("src", card.url);
  const elementAlt = elementTemplate.querySelector('.element__image').setAttribute("alt", card.alt);
  const elementHeading = elementTemplate.querySelector('.element__name').textContent = card.heading;
  elements.append(elementTemplate);
});
