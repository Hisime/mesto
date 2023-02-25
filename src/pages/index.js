import {
  validationConfig,
  nameInput,
  jobInput,
  buttonAddCard,
  buttonEditProfile,
  initialCards,
  buttonEditAvatar
} from '../utils/constants';
import  { FormValidator } from '../components/FormValidator.js';
import  { Card } from '../components/Card.js';
import './index.css';
import {PopupWithImage} from "../components/PopupWithImage";
import {PopupWithForm} from "../components/PopupWithForm";
import {UserInfo} from "../components/UserInfo";
import {Section} from "../components/Section";
import {Api} from "../components/Api";
import {PopupWithConfirmation} from "../components/PopupWithConfirmation";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '8a408fa5-d573-4a4b-999d-ef2dcd8b62ea',
    'Content-Type': 'application/json'
  }
});

const handleCardFormSubmit = (evt, data) => {
  popupAddCard.setSubmitToLoading();
  api.addCard({name:data['input-title'], link: data['input-link']})
    .then(
      (res) => {
        cardsSection.addItem(createCard(res), true);
        popupAddCard.close();
      })
    .finally(() => {
      popupAddCard.setTextToSubmitButton('Создать');
    })
}
const handleProfileFormSubmit = (evt, data) => {
  popupEditProfile.setSubmitToLoading();
  api.editProfile({name: data['input-name'], about: data['input-job']})
    .then((res) => {
      userInfo.setUserInfo({userName: res.name, userInfo: res.about, userId: res._id});
      popupEditProfile.close();
    })
    .finally(() => {
      popupEditProfile.setTextToSubmitButton('Сохранить');
    })
}

const handleAvatarFormSubmit = (evt, data) => {
  avatarPopup.setSubmitToLoading();
  api.changeAvatar(data['avatar-link'])
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      avatarPopup.close()
    })
    .finally(() => {
      avatarPopup.setTextToSubmitButton('Сохранить');
    })
}

const handleRemoveCardClick = (confirmAction, id) => {
  confirmationPopup.open(() => {
    api.deleteCard(id).then(() => {
      confirmAction();
      confirmationPopup.close();
    })
  })
}

const handleFavoriteClick = (id, isLiked) => {
  return isLiked ? api.removeLike(id) : api.addLike(id);
}

const createCard = (cardData) => {
  const card = new Card(cardData,
    '#gallery-item-template',
    (name, link) => imagePopup.open(name, link),
    userInfo.getUserInfo().userId,
    handleRemoveCardClick,
    handleFavoriteClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const popupAddCard = new PopupWithForm('.popup_type_add', handleCardFormSubmit);
const popupEditProfile = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
const imagePopup = new PopupWithImage('.popup_type_photo');
const confirmationPopup = new PopupWithConfirmation('.popup_type_confirm');
const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit)
const userInfo = new UserInfo({userName: '.profile__name', userInfo: '.profile__description', userAvatar: '.profile__image'});
api.getUser()
  .then((res) => {
    userInfo.setUserInfo({
      userName: res.name,
      userInfo: res.about,
      userId: res._id
    });
    userInfo.setAvatar(res.avatar)
  })
  .then(() => api.getCards())
  .then(
    (res) => {
      cardsSection = new Section({items: res, renderer: createCard}, '.gallery');
      cardsSection.renderElements();
    }
  );

let cardsSection;

[popupAddCard, popupEditProfile, imagePopup, confirmationPopup, avatarPopup].forEach( (item) => {
  item.setEventListeners()
});

const initProfileFormInputs = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userInfo;
}

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

enableValidation(validationConfig);

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open()
  initProfileFormInputs();
  formValidators['profile-form'].resetValidation();
});

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open()
});

buttonEditAvatar.addEventListener('click', () => {
  avatarPopup.open()
})
