import "./index.css";

import {
  popupElementProfile,
  popupOpenButtonElementProfile,
  nameElementProfile,
  aboutElementProfile,
  formElementProfile,
  nameInputProfile,
  aboutInputProfile,
  popupElementCard,
  popupAddButtonCard,
  formElementCard,
  placeInputCard,
  linkInputCard,
  popupZoom,
  popupCloseButtonZoomCard,
  cardContainer,
  popups,
  initialCards,
  validationSettings } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';

//экземпляры классов валидация форм
const editProfileValidator = new FormValidator(validationSettings, formElementProfile);
const addCardValidator = new FormValidator(validationSettings, formElementCard);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

//---ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ---

//экземпляры классов информация о пользователе
const userProfile = new UserInfo('.profile__title', '.profile__subtitle')

//экземпляры классов попап с формой (изменение данных пользователя)
 const editPopupProfile = new PopupWithForm('.popup_action_edit-profile', {
  submitHandlerForm: (userData) => {
    userProfile.setUserInfo(userData);
    editPopupProfile.close();
}
});

editPopupProfile.setEventListeners();


//---КАРТОЧКИ---


const createNewCard = (cardData) => {
  const cardElement = new Card({
    cardData, handleCardClick: () => {
          zoomPopupCard.open(cardData.name, cardData.link);
          }
      }, '.place-card');
  return cardElement.returnCard();
}

const createSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createNewCard(item);
    createSection.addItem(cardElement);
  }
}, '.elements__list');

createSection.renderItems();


//---ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ---

//экземпляры классов попап с карточкой
const addPopupCard = new PopupWithForm('.popup_action_add-card', {
  submitHandlerForm: (cardData) => {
    const cardElement = createNewCard(cardData);
    createSection.addItem(cardElement);
    addPopupCard.close();
    addCardValidator.disableSubmitButton();
  }
});

addPopupCard.setEventListeners();


//---ОТКРЫТИЕ КАРТОЧКИ---

//экземпляры классов попап с карточкрй попапа карточки
const zoomPopupCard = new PopupWithImage('.popup_action_zoom-card');

zoomPopupCard.setEventListeners();


//---ОБРАБОТЧИКИ---

//обработчик события для открытия формы профиля
popupOpenButtonElementProfile.addEventListener('click', function () {
  const userData = userProfile.getUserInfo();
  nameInputProfile.value = userData.userName;
  aboutInputProfile.value = userData.userInfo;
  editProfileValidator.resetErrors();
  editPopupProfile.open();
});

//обработчик события для открытия формы карточки
popupAddButtonCard.addEventListener('click', function () {
  addCardValidator.resetErrors();
  addPopupCard.open();
});


