const showInputError = (form, input, errorMessage, config) => {
  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.textContent = errorMessage;
  input.classList.add(config.inputErrorClass);
}

const hideInputError = (form, input, config) => {
  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.textContent = '';
  input.classList.remove(config.inputErrorClass);
}

const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

const toggleButtonState  = (inputs, button, config) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.classList.remove(config.inactiveButtonClass);
  }
};


const setEventListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    })
  })
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const enableValidation = (config) => {
  const form = document.querySelector(config.formSelector);
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListeners(form, config);
};
