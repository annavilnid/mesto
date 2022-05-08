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
  validationSettings } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

let userId;

//экземпляры классов валидация форм
const editProfileValidator = new FormValidator(validationSettings, formElementProfile);
const addCardValidator = new FormValidator(validationSettings, formElementCard);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

//экземпляр Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '95c10f81-6e99-4f87-9fcd-42df77e6047a',
    'Content-Type': 'application/json'
  }
})

//экземпляры классов информация о пользователе
const userProfile = new UserInfo({name: '.profile__title', info: '.profile__subtitle', avatar: '.profile__avatar'});

//экземпляр карточек и разметки
const createNewCard = (cardData) => {
  const cardElement = new Card({
    cardData,
    handleCardClick: () => {
          zoomPopupCard.open(cardData.name, cardData.link);
    },

    handleDeleteClick: () => {
      console.log(cardData);
          confirmDelitePopup.open()
          confirmDelitePopup.setSubmitAction( () => {
            api.deliteCardApi(cardData._id)
            .then(() => {
              cardElement.handleDelete()
              confirmDelitePopup.close()
            })
            .catch((err) => console.log(err))
          })
    },

    handleLikeClick: () => {
      console.log('Вызов из index.js нравиться');
      api.likeApi(cardData._id)
      .then(() => {
        cardElement.handlelike()
      })
      .catch((err) => console.log(err))
    },

    handleDislikeClick: () => {
      console.log('Вызов из index.js не нравиться');
      api.dislikeApi(cardData._id)
      .then(() => {
        cardElement.handlelike()
      })
      .catch((err) => console.log(err))
    }

      //handlelikeClick: () => {
      //console.log('Вызов из index.js нравиться')
      //console.log(cardData);
      //api.likeApi(cardData._id)
      //.then(() => {
      //  cardElement.handlelike()
      //})
      //.catch((err) => console.log(err))
    //},

    //handleDislikeClick: () => {
      //console.log('Вызов из index.js разонравилось')
      //api.dislikeApi(cardData._id)
      //.then(() => {
        //cardElement.handlelike()
      //})
      //.catch((err) => console.log(err))
    //}

  }, '.place-card', userId);
  return cardElement.returnCard();
}

const createSection = new Section (
  (item) => {
    const cardElement = createNewCard({
      name: item.name,
      link: item.link,
      _id: item._id,
      likes: item.likes,
      owner: item.owner,
  });
    createSection.addItem(cardElement);
  }, '.elements__list');


// информация по всем промисам (профиль пользователя и карточки) при загрузке страницы
api.getDataApi()
  .then(( [cardsData, userData] ) => {
    userProfile.setUserInfo(userData);
    userProfile.setUserAvatar(userData);
    userId = userData._id
    createSection.renderItems(cardsData);
  })
  .catch((err) => console.log(err))








//---ИЗМИНЕНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ---

//экземпляры классов попап с формой (изменение данных пользователя)
 const editPopupProfile = new PopupWithForm('.popup_action_edit-profile', {
  submitHandlerForm: (formValues) => {
    api.setUserInfoApi(formValues)
    userProfile.setUserInfo(formValues);
    editPopupProfile.close();
}
});

editPopupProfile.setEventListeners();



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
  nameInputProfile.value = userData.name;
  aboutInputProfile.value = userData.about;
  editProfileValidator.resetErrors();
  editPopupProfile.open();
});

//обработчик события для открытия формы карточки
popupAddButtonCard.addEventListener('click', function () {
  addCardValidator.resetErrors();
  addPopupCard.open();
});


//---УДАЛЕНИЕ КАРТОЧКИ

//экземпляры классов попапа с подтверждением удаления
const confirmDelitePopup = new PopupWithConfirm ('.popup_confirm-delete');
confirmDelitePopup.setEventListeners();


