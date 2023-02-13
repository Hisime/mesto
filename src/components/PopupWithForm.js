import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(evt, values[0], values[1]);
      this.close();
    })
  }

  _getInputValues() {
    const elements = Array.from(this._popupElement.querySelectorAll("form input"));
    return elements.map((element) => {
      return element.value
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

}
