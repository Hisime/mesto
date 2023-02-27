import {
  validationConfig,
  buttonAddCard,
  buttonEditProfile,
  buttonEditAvatar
} from '../utils/constants';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
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
  popupAddCard.renderLoading(true);
  api.addCard({name: data['input-title'], link: data['input-link']})
    .then(
      (res) => {
        cardsSection.addItem(res, true);
        popupAddCard.close();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading();
    });
}
const handleProfileFormSubmit = (evt, data) => {
  popupEditProfile.renderLoading(true);
  api.editProfile({name: data['input-name'], about: data['input-job']})
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading();
    });
}

const handleAvatarFormSubmit = (evt, data) => {
  avatarPopup.renderLoading(true);
  api.changeAvatar(data['avatar-link'])
    .then((res) => {
      userInfo.setUserInfo(res);
      avatarPopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading();
    });
}

const handleRemoveCardClick = (confirmAction, id) => {
  confirmationPopup.open(() => {
    api.deleteCard(id).then(() => {
      confirmAction();
      confirmationPopup.close();
    })
    .catch((err) => {
      console.log(err);
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
const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__description',
  userAvatar: '.profile__image'
});
let cardsSection;

Promise.all([api.getUser(), api.getCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardsSection = new Section({items: cards, renderer: createCard}, '.gallery');
    cardsSection.renderElements();
  })
  .catch((err) => {
    console.log(err);
  });


[popupAddCard, popupEditProfile, imagePopup, confirmationPopup, avatarPopup].forEach((item) => {
  item.setEventListeners()
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

enableValidation(validationConfig);

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open()
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues({
    'input-name': userData.userName,
    'input-job': userData.userInfo,
  });
  formValidators['profile-form'].resetValidation();
});

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open()
});

buttonEditAvatar.addEventListener('click', () => {
  avatarPopup.open()
})
