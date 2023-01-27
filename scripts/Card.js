import { openPopup } from './index.js';

const popupPhoto = document.querySelector('.popup_type_photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupTitle = popupPhoto.querySelector('.popup__photo-name');

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._galleryImage = this._element.querySelector('.gallery__image');
    const galleryCity = this._element.querySelector('.gallery__city');

    galleryCity.textContent = this._name;
    this._galleryImage.alt = this._name;
    this._galleryImage.src = this._link;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    const favoriteButton = this._element.querySelector('.gallery__favorite');
    favoriteButton.addEventListener('click', (event) => {
      this._handleFavoriteClick(event);
    });
    const deleteButton = this._element.querySelector('.gallery__delete-button');
    deleteButton.addEventListener('click', (event) => {
      this._handleRemoveCardClick(event);
    });

    this._galleryImage.addEventListener('click', (event) => {
      this._handleGalleryPopupClick(event);
    })
  };

  _handleFavoriteClick(event) {
    event.target.classList.toggle('gallery__favorite_active');
  }

  _handleRemoveCardClick(event) {
    event.target.closest('.gallery__item').remove();
  }

  _handleGalleryPopupClick() {
    openPopup(popupPhoto);
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name;
  };
 }
