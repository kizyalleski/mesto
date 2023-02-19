const editProfilePopup = document.querySelector('#edit-profile-popup');
const editProfileButton = document.querySelector('#edit-profile-button');
const closePopupButton = document.querySelector('#close-popup-button');
const formSubmitButton = document.querySelector('#form-submit-button');
const profileUserName = document.querySelector('#profile-user-name');
const profileUserOccupation = document.querySelector('#profile-user-occupation');
const formUserName = document.querySelector('#form-user-name');
const formUserOccupation = document.querySelector('#form-user-occupation');
const likeButton = document.querySelectorAll('.element__like'); // массив кнопок

// функция открытия попапа
function openPopup(popup) {
  formUserName.value = profileUserName.textContent;   // подстановка значений из основной страницы в попап
  formUserOccupation.value = profileUserOccupation.textContent;
  popup.classList.add('popup_opened');
}

// функция закрытия попапа
function closePoup(popup) {
  popup.classList.remove('popup_opened');
}

// нажатие кнопки редактировать профиль
editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
});

// нажатие кнопки закрытыя редактирования профия
closePopupButton.addEventListener('click', function () {
  closePoup(editProfilePopup);
});

// нажатие кнопки сохранить
formSubmitButton.addEventListener('click', function() {
  event.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserOccupation.textContent = formUserOccupation.value;
  closePoup(editProfilePopup);
});
