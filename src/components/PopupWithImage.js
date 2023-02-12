import {Popup} from "./Popup";

const popupPhoto = document.querySelector('.popup_type_photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupTitle = popupPhoto.querySelector('.popup__photo-name');

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
  }
}
