const configuration = {
  formSelector: ".form",
  editingProfileFormId: "editingProfileForm",
  inputSelector: ".form__input",
  invalidInputClass: "form__input_invalid",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
};

const showInputError = (input, inputError, config) => {
  input.classList.add(config.invalidInputClass);
  inputError.textContent = input.validationMessage;
};

const hideInputError = (input, inputError, config) => {
  input.classList.remove(config.invalidInputClass);
  inputError.textContent = "";
};

const isInputValid = (input, inputError, config) => {
  if (!input.validity.valid) {
    showInputError(input, inputError, config);
  } else {
    hideInputError(input, inputError, config);
  }
};

const hasInvalidInputs = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
};

const disableButton = (button, config) => {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
};

const enableButton = (button, config) => {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
};

const toggleButtonState = (inputList, button, config) => {
  if (hasInvalidInputs(inputList)) {
    disableButton(button, config);
  } else {
    enableButton(button, config);
  }
};

const setEventListeners = (form, inputList, button, config) => {
  form.addEventListener("input", (e) => {
    const input = e.target;
    const inputError = form.querySelector(`.${input.id}-error`);
    isInputValid(input, inputError, config);
    toggleButtonState(inputList, button, config);
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    toggleButtonState(inputList, button, config);
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    setEventListeners(form, inputList, submitButton, config);
    toggleButtonState(inputList, submitButton, config);
  });
};

enableValidation(configuration);
