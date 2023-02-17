// КНОПКИ

const editProfilePopup = document.querySelector("#edit-profile-popup"); // попап редактирования профиля

// функция открытия попапа
function openPopup(popup) {
  popup.classList.remove("popup__hidden");
}

// функция закрытия попапа
function closePoup(popup) {
  popup.classList.add("popup__hidden");
}

// кнопка редактировать профиль
const editProfileButton = document.querySelector("#edit-profile-button");
if (!editProfileButton) {
  throw new Error("NO editProfileButton");
}

editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
});

// кнопка закрытыя редактирования профия
const closePopupButton = document.querySelector("#close-popup-button");
if (!closePopupButton) {
  throw new Error("NO closePopupButton");
}

closePopupButton.addEventListener("click", function () {
  closePoup(editProfilePopup);
});
