export const popupElementProfile = document.querySelector('.popup_action_edit-profile');
export const popupOpenButtonElementProfile = document.querySelector('.profile__edit-button');
const infoElementProfile = document.querySelector('.profile__info');
export const nameElementProfile = infoElementProfile.querySelector('.profile__title');
export const aboutElementProfile = infoElementProfile.querySelector('.profile__subtitle');
export const formElementProfile = document.querySelector('.popup__form_action_edit-profile');
export const nameInputProfile = formElementProfile.querySelector('.popup__input_data_name');
export const aboutInputProfile = formElementProfile.querySelector('.popup__input_data_about');
export const popupElementCard = document.querySelector('.popup_action_add-card');
export const popupAddButtonCard = document.querySelector('.profile__add-button');
export const formElementCard = document.querySelector('.popup__form_action_add-card');
export const placeInputCard = formElementCard.querySelector('.popup__input_data_place');
export const linkInputCard = formElementCard.querySelector('.popup__input_data_place-link');
export const popupZoom = document.querySelector('.popup_action_zoom-card');
export const imageAttribure = popupZoom.querySelector('.popup__image');
export const imageDescription = popupZoom.querySelector('.popup__figcaption');
export const popupCloseButtonZoomCard = popupZoom.querySelector('.popup__close-button');
export const cardContainer = document.querySelector('.elements__list');
export const popups = document.querySelectorAll('.popup');
const popupAddCard = document.querySelector('.popup_action_add-card');
export const buttonSubmitCard = popupAddCard.querySelector('.popup__save-button');

export const initialcards = [
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

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  submitButtonDisabled: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
