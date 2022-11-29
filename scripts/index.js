let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput =  formElement.querySelector('.popup__input_type_job');
let closeButton = popup.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

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
