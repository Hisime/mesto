export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._name, this._link);
    })
  };

  _handleFavoriteClick(event) {
    event.target.classList.toggle('gallery__favorite_active');
  }

  _handleRemoveCardClick(event) {
    event.target.closest('.gallery__item').remove();
  }

 }
