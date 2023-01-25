export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _setPreventDefault() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  _toggleButtonState(inputs, button) {
    if (button) {
      if (this._hasInvalidInput(inputs)) {
        button.classList.add(this._config.inactiveButtonClass);
        button.setAttribute('disabled', 'disabled');
      } else {
        button.classList.remove(this._config.inactiveButtonClass);
        button.removeAttribute('disabled');
      }
    }
  };

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
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
    const inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const button = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputs, button);
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
      this._toggleButtonState(inputs, button);
      }, 0);
    });
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, button);
      })
    })
  }

  enableValidation() {
    this._setPreventDefault();
    this._setEventListeners();
  }

  resetValidation() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const button = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputs, button);
    inputs.forEach((input) => {
      this._checkInputValidity(input);
    });
  };
}
