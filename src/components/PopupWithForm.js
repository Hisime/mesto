import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");
    this._inputElements = this._popupElement.querySelectorAll("form input");
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

  close() {
    super.close();
    this._form.reset();
  }

}
