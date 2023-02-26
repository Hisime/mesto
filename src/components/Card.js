
export class Card {
  constructor(data, templateSelector, handleCardClick, userId, handleRemoveCardClick, handleFavoriteClick) {
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
    this._likesCounter = this._element.querySelector('.gallery__like');
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._handleFavoriteClick = handleFavoriteClick;
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
    this._likesCounter.textContent = this._likes.length;
    if (this._userId !== this._cardOwnerId) {
      this._buttonDelete.remove();
    }
    if (this._likes.find((item) => {
      return this._userId === item._id;
    })) {
      this._favoriteButton.classList.add('gallery__favorite_active');
    }
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._favoriteButton.addEventListener('click', () => {
      this._handleFavoriteClick(this._cardId,  this._favoriteButton.classList.contains('gallery__favorite_active'))
        .then((res) => {
          this._likes = res.likes;
          this._likesCounter.textContent = this._likes.length;
          this._favoriteButton.classList.toggle('gallery__favorite_active');
        })
        .catch((err) => {
        console.log(err);
      });
    });
    this._buttonDelete.addEventListener('click', (event) => {
      this._handleRemoveCardClick(() => this._removeCard(), this._cardId);
    });

    this._galleryImage.addEventListener('click', (event) => {
      this._handleCardClick(this._name, this._link);
    })
  };

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

 }
