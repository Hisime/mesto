const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = popupEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput =  formElementEdit.querySelector('.popup__input_type_job');

const popupAdd = document.querySelector('.popup_type_add');
const addFormElement = popupAdd.querySelector('.popup__form');
const titleInput = addFormElement.querySelector('.popup__input_type_title');
const linkInput = addFormElement.querySelector('.popup__input_type_link');

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

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopups = () => {
  const closeButtons = document.querySelectorAll('.popup__close');
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', (event) => {
      closePopup(event.target.closest('.popup'));
    })
  }
}

closePopups();

const addInitialValues = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

addButton.addEventListener('click', () => openPopup(popupAdd));

const template = document.querySelector('#gallery-item-template');
const gallery = document.querySelector('.gallery');

const createCard = (name, link) => {
  const galleryItem = template.content.querySelector('.gallery__item').cloneNode(true);
  const galleryCity = galleryItem.querySelector('.gallery__city');
  const galleryImage = galleryItem.querySelector('.gallery__image');
  const removeCard = () => {
    const deleteButton = galleryItem.querySelector('.gallery__delete-button');
    deleteButton.addEventListener('click', (event) => {
      event.target.closest('.gallery__item').remove();
    });
  }
  const addFavorite = () => {
    const favoriteButton = galleryItem.querySelector('.gallery__favorite');
    favoriteButton.addEventListener('click', (event) => {
      event.target.classList.toggle('gallery__favorite_active');
    });
  }
  const generatePhotoPopup = () => {
    galleryImage.addEventListener('click', (event) => {
    const galleryCityName = event.target.closest('.gallery__item').querySelector('.gallery__city');
    openPopup(popupPhoto);
    popupImage.src = event.target.src;
    popupImage.alt = galleryCityName.textContent;
    popupTitle.textContent = galleryCityName.textContent;
  })
  }
  galleryCity.textContent = name;
  galleryImage.alt = name;
  galleryImage.src = link;
  removeCard();
  addFavorite();
  generatePhotoPopup();
  return galleryItem;
};

for (let i = 0; i < initialCards.length; i++) {
  gallery.append(createCard(initialCards[i].name, initialCards[i].link));
}


const handleAddForm = (evt) => {
  evt.preventDefault();
  gallery.prepend(createCard(titleInput.value, linkInput.value));
  closePopup(popupAdd);
  evt.target.reset();
}

addFormElement.addEventListener('submit', handleAddForm)

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  addInitialValues();
});
