import { openPopup } from './index.js';

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
    const galleryCity = this._element.querySelector('.gallery__city');
    const galleryImage = this._element.querySelector('.gallery__image');

    galleryCity.textContent = this._name;
    galleryImage.alt = this._name;
    galleryImage.src = this._link;
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

    const galleryImage = this._element.querySelector('.gallery__image');
    galleryImage.addEventListener('click', (event) => {
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
    const popupPhoto = document.querySelector('.popup_type_photo');
    const popupImage = popupPhoto.querySelector('.popup__image');
    const popupTitle = popupPhoto.querySelector('.popup__photo-name');
    openPopup(popupPhoto);
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name;
  };
 }
