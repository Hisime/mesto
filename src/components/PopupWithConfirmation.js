import {Popup} from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = this._popupElement.querySelector('.popup__save');
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', () => {
      this._confirm();
    })
  }

  open(action) {
    super.open()
    this._confirm = action;
  }
}
