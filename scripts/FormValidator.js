export default class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._inputSelector = config.inputSelector;
    this._invalidInputClass = config.invalidInputClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._errorList = this._form.querySelectorAll(config.inputErrorSelector);
  }

  _showInputError(input, inputError) {
    input.classList.add(this._invalidInputClass);
    inputError.textContent = input.validationMessage;
  }

  _hideInputError(input, inputError) {
    input.classList.remove(this._invalidInputClass);
    inputError.textContent = "";
  }

  _toggleInputState(input, inputError) {
    if (!input.validity.valid) {
      this._showInputError(input, inputError);
    } else {
      this._hideInputError(input, inputError);
    }
  }

  _setIventListeners() {
    this._form.addEventListener("input", (e) => {
      const input = e.target;
      const inputError = this._form.querySelector(`.${input.id}-error`);
      this._toggleInputState(input, inputError);
      this._toggleButtonState();
    });
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._toggleButtonState();
    });
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInputs() {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInputs(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  enableValidation() {
    this._setIventListeners();
  }

  resetValidation() {
    this._disableButton();
    
    this._inputList.forEach( input => {
      this._errorList.forEach( error => {
        this._hideInputError(input, error);
      });
    })
  }
}
