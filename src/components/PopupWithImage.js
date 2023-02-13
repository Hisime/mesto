import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = document.querySelector('.popup_type_photo');
    this._popupImage = this._popupPhoto.querySelector('.popup__image');
    this._popupTitle = this._popupPhoto.querySelector('.popup__photo-name');
  }

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
  }
}
