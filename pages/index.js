// КНОПКИ

const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап редактирования профиля

// функция открытия попапа
function openPopup(popup) {
  popup.classList.remove('popup_hidden');
}

// функция закрытия попапа
function closePoup(popup) {
  popup.classList.add('popup_hidden');
}

// нажатие кнопки редактировать профиль
const editProfileButton = document.querySelector('#edit-profile-button');
if (!editProfileButton) {
  throw new Error('NO editProfileButton');
}

editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
});

// нажатие кнопки закрытыя редактирования профия
const closePopupButton = document.querySelector('#close-popup-button');
if (!closePopupButton) {
  throw new Error('NO closePopupButton');
}

closePopupButton.addEventListener('click', function () {
  closePoup(editProfilePopup);
});


// нажатие кнопки сохранить
const formSubmitButton = document.querySelector('#form-submit-button');
if (!formSubmitButton) {
  throw new Error('NO formSubmitButton')
}

formSubmitButton.addEventListener('click', function() {
  event.preventDefault();
  const formUserName = document.querySelector('#form-user-name').value;
  if (!formUserName) {
    throw new Error('NO formUserName')
  }

  const formUserOccupation = document.querySelector('#form-user-occupation').value;
  if (!formUserOccupation) {
    throw new Error('NO formUserOccupation')
  }

  document.querySelector('#profile-user-name').textContent = formUserName;
  document.querySelector('#profile-user-occupation').textContent = formUserOccupation;
  closePoup(editProfilePopup);
});
