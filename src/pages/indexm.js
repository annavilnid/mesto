import "./index.css";

import {
  popupElementProfile,
  popupOpenButtonElementProfile,
  nameElementProfile,
  aboutElementProfile,
  formElementProfile,
  nameInputProfile,
  aboutInputProfile,
  avatarElementProfile,
  popupElementCard,
  popupAddButtonCard,
  formElementCard,
  placeInputCard,
  linkInputCard,
  popupZoom,
  popupCloseButtonZoomCard,
  cardContainer,
  popups,
  //initialCards,
  validationSettings } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';


//экземпляр Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '95c10f81-6e99-4f87-9fcd-42df77e6047a',
    'Content-Type': 'application/json'
  }
})





//Тест
const userProfileApi = api.getUserInfoApi();
userProfileApi.then((data) => {
  console.log(data + 'вывели профиль');
  //nameElementProfile.textContent = data.name;
  //aboutElementProfile.textContent = data.about;
  //avatarElementProfile.src = data.avatar;
});




//экземпляр карточек и разметки
const createNewCard = (cardData) => {
  const cardElement = new Card({
    cardData, handleCardClick: () => {
          zoomPopupCard.open(cardData.name, cardData.link);
          }
      }, '.place-card', userId);
  return cardElement.returnCard();
}

const createSection = new Section (
  (item) => {
    const cardElement = createNewCard({
      name: item.name,
      link: item.link,
      id: item._id,
      likes: item.likes,
      owner: item.owner,
  });
    createSection.addItem(cardElement);
  }, '.elements__list');




//тест
const cardsApi = api.getCardsApi();

cardsApi.then((cardData) => {
  console.log(cardData);
});

//экземпляры классов информация о пользователе
const userProfile = new UserInfo({name: '.profile__title', info: '.profile__subtitle'});

let userId;

// информация по всем промисам (профиль пользователя и карточки)
api.getDataApi()
  .then(( [cardsData, userData] ) => {
    userProfile.setUserInfo(userData)
    userId = userData._id
    createSection.renderItems(cardsData);
  })
  .catch((err) => console.log(err))






//экземпляры классов валидация форм
const editProfileValidator = new FormValidator(validationSettings, formElementProfile);
const addCardValidator = new FormValidator(validationSettings, formElementCard);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();



console.log(editProfileValidator);









/*

//---ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ---


//экземпляры классов информация о пользователе
const userProfile = new UserInfo({name: '.profile__title', info: '.profile__subtitle'});


//экземпляры классов попап с формой (изменение данных пользователя)
 const editPopupProfile = new PopupWithForm('.popup_action_edit-profile', {
  submitHandlerForm: (userData) => {
    //api.setUserInfoApi(userData);
    userProfile.setUserInfo(userData);
    editPopupProfile.close();
}
});

editPopupProfile.setEventListeners();
*/
//---КАРТОЧКИ---на удаление

/*
const createNewCard = (cardData) => {
  const cardElement = new Card({
    cardData, handleCardClick: () => {
          zoomPopupCard.open(cardData.name, cardData.link);
          }
      }, '.place-card');
  return cardElement.returnCard();
}

const createSection = new Section({
  //items: initialCards,
  renderer: (item) => {
    const cardElement = createNewCard(item);
    createSection.addItem(cardElement);
  }
}, '.elements__list');*/

//createSection.renderItems();*/


//---ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ---

const addPopupCard = new PopupWithForm('.popup_action_add-card', {
  submitHandlerForm: (formValues) => {
    api.addNewCardApi(formValues)
    .then((cardData) => {
    const cardElement = createNewCard(cardData);
    createSection.addItem(cardElement);
    addPopupCard.close();
    addCardValidator.disableSubmitButton();
   })
   .catch((err) => console.log(err))
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


