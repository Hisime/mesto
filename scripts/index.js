const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add');
const addFormElement = popupAdd.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput =  formElement.querySelector('.popup__input_type_job');
const closeButton = popup.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');



const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closeButtons = document.querySelectorAll('.popup__close');

for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  })
}



//for edit popup
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

addButton.addEventListener('click', () => openPopup(popupAdd));


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

const generateCard = (name, link, prepend) => {
  const galleryItem = template.content.querySelector('.gallery__item').cloneNode(true);
  galleryItem.querySelector('.gallery__city').textContent = name;
  galleryItem.querySelector('.gallery__image').src = link;
  if (prepend) {
    gallery.prepend(galleryItem);
  } else {
    gallery.append(galleryItem);
  }
  const deleteButton = galleryItem.querySelector('.gallery__delete-button');
  deleteButton.addEventListener('click', (event) => {
    event.target.closest('.gallery__item').remove();
  });
  const favoriteButton = galleryItem.querySelector('.gallery__favorite');
  favoriteButton.addEventListener('click', (event) => {
    event.target.classList.toggle('gallery__favorite_active');
  });
};

for (let i = 0; i < initialCards.length; i++) {
  generateCard(initialCards[i].name, initialCards[i].link);
}


function handleAddForm (evt) {
  const titleInput = addFormElement.querySelector('.popup__input_type_title');
  const linkInput = addFormElement.querySelector('.popup__input_type_link');
  evt.preventDefault();
  generateCard(titleInput.value, linkInput.value, true);
  closePopup(popupAdd);
}

addFormElement.addEventListener('submit', handleAddForm)


function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', () => openPopup(popupEdit));
