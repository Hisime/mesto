import {PopupWithConfirmation} from "./PopupWithConfirmation";

export class Card {
  constructor(data, templateSelector, handleCardClick, userId, handleRemoveCardClick) {
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._likes= data.likes;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._favoriteButton = this._element.querySelector('.gallery__favorite');
    this._buttonDelete = this._element.querySelector('.gallery__delete-button');
    this._galleryImage = this._element.querySelector('.gallery__image');
    this._galleryCity = this._element.querySelector('.gallery__city');
    this._likesSelector = this._element.querySelector('.gallery__like');
    this._handleRemoveCardClick = handleRemoveCardClick;
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
    this._galleryCity.textContent = this._name;
    this._galleryImage.alt = this._name;
    this._galleryImage.src = this._link;
    this._likesSelector.textContent = this._likes.length;
    if (this._userId !== this._cardOwnerId) {
      this._buttonDelete.remove();
    }
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._favoriteButton.addEventListener('click', (event) => {
      this._handleFavoriteClick(event);
    });
    this._buttonDelete.addEventListener('click', (event) => {
      this._handleRemoveCardClick(() => this._removeCard(), this._cardId);
    });

    this._galleryImage.addEventListener('click', (event) => {
      this._handleCardClick(this._name, this._link);
    })
  };

  _handleFavoriteClick(event) {
    event.target.classList.toggle('gallery__favorite_active');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

 }
