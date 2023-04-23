const editProfilePopup = document.querySelector("#editProfilePopup");
const editProfileButton = document.querySelector("#editProfileButton");
const closeEditProfilePopupButton = document.querySelector(
  "#closeEditProfilePopupButton"
);
const editProfileFormSubmitButton = document.querySelector(
  "#editProfileFormSubmitButton"
);
const profileUserName = document.querySelector("#profileUserName");
const profileUserOccupation = document.querySelector("#profileUserOccupation");
const formUserName = document.querySelector("#formUserName");
const formUserOccupation = document.querySelector("#formUserOccupation");

const imagePopup = document.querySelector("#imagePopup");

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
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
});

// нажатие кнопки закрытыя редактирования профия
closeEditProfilePopupButton.addEventListener("click", () => {
  closePopup(editProfilePopup);
});

// нажатие кнопки сохранить
editProfileFormSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserOccupation.textContent = formUserOccupation.value;
  closePopup(editProfilePopup);
});

////////////////////////////////

// добавление на страницу начальных карточек

function createNewCard(card) {
  const elementTemplate = document
    .querySelector("#elementTemplate")
    .content.cloneNode(true);
  const elementUrl = elementTemplate.querySelector(".element__image");
  const elementAlt = elementTemplate.querySelector(".element__image");
  const elementHeading = elementTemplate.querySelector(".element__name");
  elementUrl.setAttribute("src", card.url);
  elementAlt.setAttribute("alt", card.alt);
  elementHeading.textContent = card.heading;
  elements.prepend(elementTemplate);
}
cards.forEach(createNewCard);

// ФУНКЦИОНАЛ УДАЛЕНИЯ КАРТОЧКИ
const trashButtons = document.querySelectorAll(".element__trash");
trashButtons.forEach((button) => {
  button.addEventListener("click", function () {
    button.closest(".element").remove();
  });
});

// НАЖАТИЕ НА ИЗОБРАЖЕНИЕ
const fullcreenButtons = document.querySelectorAll(".element__fullscreen");
// функция открытия полной версии изображения
function openImage(event) {
  const image = imagePopup.querySelector(".popup__image");
  const imageData = {
    url: event.target.getAttribute("src"),
    caption:
      event.target.parentElement.nextElementSibling.nextElementSibling
        .firstElementChild.textContent,
  };
  image.setAttribute("src", imageData.url);
  image.nextElementSibling.textContent = imageData.caption;
  openPopup(imagePopup);
}
fullcreenButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    openImage(event);
  });
});
// нажатие кнопки закрытия попапа изображения
const closeImagePopupButton = document.querySelector("#closeImagePopupButton");
closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));

// ФУНКЦИОНАЛ ЛАЙКА
const likes = document.querySelectorAll(".element__like");
likes.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("element__like_active");
  });
});

// ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК
const addCardPopup = document.querySelector("#addCardPopup");
const addCardButton = document.querySelector("#addCardButton");
const closeAddCardPopupButton = document.querySelector(
  "#closeAddCardPopupButton"
);

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

closeAddCardPopupButton.addEventListener("click", () => {
  closePopup(addCardPopup);
});

const addCardformSubmitButton = document.querySelector(
  "#addCardformSubmitButton"
);
let formCardName = document.querySelector("#formCardName");
let formCardUrl = document.querySelector("#formCardUrl");

addCardformSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newCard = {
    url: formCardUrl.value,
    alt: "Добавленное изображение",
    heading: formCardName.value,
  };
  createNewCard(newCard);
  closePopup(addCardPopup);
  formCardName.value = "";
  formCardUrl.value = "";

  // добавление функционала новой карточке
  let newLike = document.querySelector(".element__like");
  newLike.addEventListener("click", () => {
    newLike.classList.toggle("element__like_active");
  });

  let newTrashButton = document.querySelector(".element__trash");
  newTrashButton.addEventListener("click", () => {
    newTrashButton.closest(".element").remove();
  });

  let newFullcreenButton = document.querySelector(".element__fullscreen");
  newFullcreenButton.addEventListener("click", (event) => {
    openImage(event);
  });
});
