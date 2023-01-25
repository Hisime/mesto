import  { FormValidator } from './FormValidator.js';
import  { Card } from './Card.js';


const popupEdit = document.querySelector('.popup_type_edit');
const profileForm = document.forms['profile-form'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput =  profileForm.querySelector('.popup__input_type_job');

const popupAdd = document.querySelector('.popup_type_add');
const cardForm = document.forms['add-card-form'];
const titleInput = cardForm.querySelector('.popup__input_type_title');
const linkInput = cardForm.querySelector('.popup__input_type_link');

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

export const openPopup = (popup) => {
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

const handleAddForm = (evt) => {
  evt.preventDefault();
  const item = {
    name: titleInput.value,
    link: linkInput.value
  };
  const card = new Card(item, '#gallery-item-template');
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);
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

const resetValidation = (form) => {
  const validator = new FormValidator(config, form);
  validator.resetValidation();
};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {

    const validator = new FormValidator(config, form);
    validator.enableValidation();
  });
};

const config = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

enableValidation(config)


initialCards.forEach((item) => {
  const card = new Card(item, '#gallery-item-template');
  const cardElement = card.generateCard();

  gallery.append(cardElement);
});
