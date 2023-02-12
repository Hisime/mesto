import  { FormValidator } from '../components/FormValidator.js';
import  { Card } from '../components/Card.js';
import './index.css';
import {PopupWithImage} from "../components/PopupWithImage";
import {PopupWithForm} from "../components/PopupWithForm";
import {UserInfo} from "../components/UserInfo";
import {Section} from "../components/Section";

const config = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const profileForm = document.forms['profile-form'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput =  profileForm.querySelector('.popup__input_type_job');

const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');

const handleAddForm = (evt, title, link) => {
  const item = {
    name: title,
    link: link
  };
  section.addItem(createCard(item), true);
}


const handleProfileFormSubmit = (evt, name, description) => {
  userInfo.setUserInfo({userName: name, userInfo: description});
}

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


const createCard = (item) => {
  const card = new Card(item, '#gallery-item-template', (name, link) => imagePopup.open(name, link));
  const cardElement = card.generateCard();
  return cardElement;
}


const addPopup = new PopupWithForm('.popup_type_add', handleAddForm);
const editProfilePopup = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
const imagePopup = new PopupWithImage('.popup_type_photo');
const userInfo = new UserInfo({userName: '.profile__name', userInfo: '.profile__description'});
const section = new Section({items: initialCards, renderer: createCard}, '.gallery');

[addPopup, editProfilePopup, imagePopup].forEach( (item) => {
  item.setEventListeners()
});

const addInitialValues = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userInfo;
}

addButton.addEventListener('click', () => {
  addPopup.open()
});

const formValidators = {}

const enableValidation = (config) => {
  const popupList = Array.from(document.querySelectorAll(config.formSelector));
  popupList.forEach((formElement) => {
    if (formElement.querySelector('form')) {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.querySelector('form').getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    }
  });
};

enableValidation(config);

editButton.addEventListener('click', () => {
  editProfilePopup.open()
  addInitialValues();
  formValidators['profile-form'].resetValidation();
});