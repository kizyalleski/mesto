const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  invalidInputClass: "form__input_invalid",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
};
const formList = document.querySelectorAll(`${config.formSelector}`);

const showInputError = (input, inputError) => {
  input.classList.add(`${config.invalidInputClass}`);
  inputError.textContent = input.validationMessage;
};

const hideInputError = (input, inputError) => {
  input.classList.remove(`${config.invalidInputClass}`);
  inputError.textContent = "";
};

const isInputValid = (input, inputError) => {
  if (!input.validity.valid) {
    showInputError(input, inputError);
  } else {
    hideInputError(input, inputError);
  }
};

const hasInvalidInputs = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
};

const disableButton = (button) => {
  button.classList.add(`${config.inactiveButtonClass}`);
  button.disabled = true;
};

const enableButton = (button) => {
  button.classList.remove(`${config.inactiveButtonClass}`);
  button.disabled = false;
};

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInputs(inputList)) {
    disableButton(button);
  } else {
    enableButton(button);
  }
};

const enableValidation = (input, inputError, submitButton, inputList) => {
  isInputValid(input, inputError);
  toggleButtonState(inputList, submitButton);
};

const setEventListeners = (form, submitButton, inputList) => {
  form.addEventListener("input", (e) => {
    const input = e.target;
    const inputError = form.querySelector(`.${input.id}-error`);
    enableValidation(input, inputError, submitButton, inputList);
  });
};

formList.forEach((form) => {
  const inputList = form.querySelectorAll(`${config.inputSelector}`);
  const submitButton = form.querySelector(`${config.submitButtonSelector}`);
  setEventListeners(form, submitButton, inputList);
  toggleButtonState(inputList, submitButton);
  if (form.id === 'editingProfileForm') {
    enableButton(submitButton);
  }
});
