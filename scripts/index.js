const editProfilePopup = document.querySelector("#editProfilePopup");
const editProfileButton = document.querySelector("#editProfileButton");
const closeEditProfilePopupButton = document.querySelector("#closeEditProfilePopupButton");
const editProfileFormSubmitButton = document.querySelector("#editProfileFormSubmitButton");
const profileUserName = document.querySelector("#profileUserName");
const profileUserOccupation = document.querySelector("#profileUserOccupation");
const formUserName = document.querySelector("#formUserName");
const formUserOccupation = document.querySelector("#formUserOccupation");
const likeButton = document.querySelectorAll(".element__like"); // массив кнопок

// функция открытия попапа
formUserName.value = profileUserName.textContent; // подстановка значений из основной страницы в попап
formUserOccupation.value = profileUserOccupation.textContent;

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// нажатие кнопки редактировать профиль
editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
});

// нажатие кнопки закрытыя редактирования профия
closeEditProfilePopupButton.addEventListener("click", function () {
  closePopup(editProfilePopup);
});

// нажатие кнопки сохранить
editProfileFormSubmitButton.addEventListener("click", function () {
  event.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserOccupation.textContent = formUserOccupation.value;
  closePopup(editProfilePopup);
});




////////////////////////////////

// Объект с наполнением начальных карточек
const cards = [
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

// добавление на страницу начальных карточек
const elements = document.querySelector("#elements");
cards.forEach((card) => {
  const elementTemplate = document.querySelector('#elementTemplate').content.cloneNode(true);
  const elementUrl = elementTemplate.querySelector('.element__image');
  elementUrl.setAttribute("src", card.url);
  const elementAlt = elementTemplate.querySelector('.element__image');
  elementAlt.setAttribute("alt", card.alt);
  const elementHeading = elementTemplate.querySelector('.element__name');
  elementHeading.textContent = card.heading;
  elements.append(elementTemplate);
});

// ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК
const addSongPopup = document.querySelector('#addSongPopup');
const addSongButton = document.querySelector('#addSongButton');
const closeAddSongPopupButton = document.querySelector('#closeAddSongPopupButton');

addSongButton.addEventListener('click', function() {
  openPopup(addSongPopup);
});

closeAddSongPopupButton.addEventListener('click', function() {
  closePopup(addSongPopup);
});




///ФУНКЦИОНАЛ ЛАЙКА
const likes = document.querySelectorAll('.element__like');
likes.forEach(function(item) {
  item.addEventListener('click', function() {
    item.classList.toggle('element__like_active');
  });
});
