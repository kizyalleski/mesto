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

// const toggleButtonState = (form, button) => {
//   if (!form.checkValidity()) {
//     button.classList.add(`${config.inactiveButtonClass}`);
//     button.setAttribute('disabled', 'true');
//   } else {
//     button.classList.remove(`${config.inactiveButtonClass}`);
//     button.removeAttribute('disabled');
//   }
// };

const hasInvalidInputs = inputList => {
  return Array.from(inputList).some( input => !input.validity.valid);
};

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInputs(inputList)) {
    button.classList.add(`${config.inactiveButtonClass}`);
    button.disabled = true;
  } else {
    button.classList.remove(`${config.inactiveButtonClass}`);
    button.disabled = false;
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
});
