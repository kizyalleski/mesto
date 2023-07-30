// Кнопки открытия попапов
const buttonEditProfile = document.querySelector("#editProfileButton");
const buttonAddCard = document.querySelector("#addCardFormButton");
const buttonChangeAvatar = document.querySelector('.profile__avatar');

// Константы для валидациии
const cardEditionForm = document.querySelector("#addCardForm");
const profileEditForm = document.querySelector("#editingProfileForm");
const avatarUpdatingForm = document.querySelector("#updateAvatarForm");

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
  buttonEditProfile,
  buttonAddCard,
  buttonChangeAvatar,
  cardEditionForm,
  profileEditForm,
  avatarUpdatingForm,
  configuration,
};

export function changeButtonToSavingState(popup) {
  popup.submitButton.textContent = 'Сохранение...';
}

export function changeButtonToSaveState(popup, selector) {
  if (popup.selector === "#addCardPopup") {
    popup.submitButton.textContent = "Создать";
  } else {
    popup.submitButton.textContent = 'Сохранить';
  }
}
