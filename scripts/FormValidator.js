export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _setPreventDefault() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  _toggleButtonState() {
    if (this._submitButton) {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._config.inactiveButtonClass);
        this._submitButton.setAttribute('disabled', 'disabled');
      } else {
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
        this._submitButton.removeAttribute('disabled');
      }
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _showInputError(input, errorMessage) {
    const inputError = this._formElement.querySelector(`.${input.id}-error`);
    inputError.textContent = errorMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(input) {
    const inputError = this._formElement.querySelector(`.${input.id}-error`);
    inputError.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
      this._toggleButtonState();
      }, 0);
    });
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setPreventDefault();
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
    });
  };
}
