const popupEdit = document.querySelector('.popup_type_edit');
const profileForm = document.forms['profile-form'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput =  profileForm.querySelector('.popup__input_type_job');

const popupAdd = document.querySelector('.popup_type_add');
const cardForm = document.forms['add-card-form'];
const titleInput = cardForm.querySelector('.popup__input_type_title');
const linkInput = cardForm.querySelector('.popup__input_type_link');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupTitle = popupPhoto.querySelector('.popup__photo-name');

const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const closeByEsc = (evt) => {
  if (evt.key === 'Escape' ){
    closePopup();
  }
}

const closePopup = () => {
  const popup = document.querySelector('.popup_opened');
  if (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
  }
}

const openPopup = (popup) => {
  document.addEventListener('keydown', closeByEsc);
  popup.classList.add('popup_opened');
};

const closePopups = () => {
  const popups = document.querySelectorAll('.popup')

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
    })
  })
}

closePopups();

const addInitialValues = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

const template = document.querySelector('#gallery-item-template');
const gallery = document.querySelector('.gallery');

const createCard = (name, link) => {
  const galleryItem = template.content.querySelector('.gallery__item').cloneNode(true);
  const galleryCity = galleryItem.querySelector('.gallery__city');
  const galleryImage = galleryItem.querySelector('.gallery__image');
  // const removeCard = () => {
  //   const deleteButton = galleryItem.querySelector('.gallery__delete-button');
  //   deleteButton.addEventListener('click', (event) => {
  //     event.target.closest('.gallery__item').remove();
  //   });
  // }
  // const addFavorite = () => {
  //   const favoriteButton = galleryItem.querySelector('.gallery__favorite');
  //   favoriteButton.addEventListener('click', (event) => {
  //     event.target.classList.toggle('gallery__favorite_active');
  //   });
  // }
  const generatePhotoPopup = () => {
    galleryImage.addEventListener('click', (event) => {
    const galleryCityName = event.target.closest('.gallery__item').querySelector('.gallery__city');
    openPopup(popupPhoto);
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
  })
  }
  // galleryCity.textContent = name;
  // galleryImage.alt = name;
  // galleryImage.src = link;
  removeCard();
  addFavorite();
  generatePhotoPopup();
  return galleryItem;
};

// for (let i = 0; i < initialCards.length; i++) {
//   gallery.append(createCard(initialCards[i].name, initialCards[i].link));
// }


const handleAddForm = (evt) => {
  evt.preventDefault();
  gallery.prepend(createCard(titleInput.value, linkInput.value));
  closePopup();
  evt.target.reset();
}

cardForm.addEventListener('submit', handleAddForm)

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

profileForm.addEventListener('submit', handleProfileFormSubmit);
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  addInitialValues();
  resetValidation(popupEdit);
});

const config = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

enableValidation(config)


class Card {
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
  }

  _handleFavoriteClick(event) {
    event.target.classList.toggle('gallery__favorite_active');
  }

  _handleRemoveCardClick(event) {
    event.target.closest('.gallery__item').remove();
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '#gallery-item-template');
  const cardElement = card.generateCard();

  gallery.append(cardElement);
});
