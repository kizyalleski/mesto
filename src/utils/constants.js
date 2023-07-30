// Кнопки открытия попапов
const editingProfileButton = document.querySelector("#editProfileButton");
const addCardButton = document.querySelector("#addCardFormButton");
const changeAvatarPopupButton = document.querySelector('.profile__avatar');

// Константы для валидациии
const additionCardForm = document.querySelector("#addCardForm");
const editingProfileForm = document.querySelector("#editingProfileForm");
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
  editingProfileButton,
  addCardButton,
  changeAvatarPopupButton,
  additionCardForm,
  editingProfileForm,
  avatarUpdatingForm,
  configuration,
};
