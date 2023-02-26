import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");
    this._inputElements = this._popupElement.querySelectorAll("form input");
    this._submitButton = this._popupElement.querySelector("button[type='submit']");
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(evt, values);
    })
  }

  _getInputValues() {
    const elements = Array.from(this._inputElements);
    const inputs = {};
    elements.forEach((element) => {
      inputs[element.name] = element.value;
    });
    return inputs;
  }

  setInputValues(data) {
    this._inputElements.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

}
