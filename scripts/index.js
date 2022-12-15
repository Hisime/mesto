const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput =  formElement.querySelector('.popup__input_type_job');
const closeButton = popup.querySelector('.popup__close');
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

const template = document.querySelector('#gallery-item-template');
const gallery = document.querySelector('.gallery');

for (let i = 0; i < initialCards.length; i++) {
  const galleryItem = template.content.querySelector('.gallery__item').cloneNode(true);
  galleryItem.querySelector('.gallery__city').textContent = initialCards[i].name;
  galleryItem.querySelector('.gallery__image').src = initialCards[i].link;
  gallery.append(galleryItem);
  const deleteButton = galleryItem.querySelector('.gallery__delete-button');
  deleteButton.addEventListener('click', (event) => {
    event.target.closest('.gallery__item').remove();
  });
  const favoriteButton = galleryItem.querySelector('.gallery__favorite');
  favoriteButton.addEventListener('click', (event) => {
    event.target.classList.toggle('gallery__favorite_active');
  });
}


function closePopup () {
  popup.classList.remove('popup_opened');
};

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
