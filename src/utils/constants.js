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
  // cards,
  editingProfileButton,
  addCardButton,
  additionCardForm,
  editingProfileForm,
  configuration,
};
