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

const resetValidation = (form) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, button, config);
  inputs.forEach((input) => {
    checkInputValidity(form, input, config);
  });
};

const toggleButtonState  = (inputs, button, config) => {
  if (button) {
    if (hasInvalidInput(inputs)) {
      button.classList.add(config.inactiveButtonClass);
      button.setAttribute('disabled', 'disabled');
    } else {
      button.classList.remove(config.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }
};


const setEventListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, button, config);
  form.addEventListener('reset', () => {
    setTimeout(() => {
     toggleButtonState(inputs, button, config);
    }, 0);
  });
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
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
};
