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
  buttonSubmitCard,
  initialcards,
  validationSettings } from './constants.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

//экземпляры классов
const editProfileValidator = new FormValidator(validationSettings, formElementProfile);
const addCardValidetor = new FormValidator(validationSettings, formElementCard);
editProfileValidator.enableValidation();
addCardValidetor.enableValidation();



function createNewCard(data, cardTemplateSelector) {
  const card = new Card(data, cardTemplateSelector);
  return card.returnCard();

}

//сделать видимым модальное окно
export const showPopup = function(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
}

//открытие всплывающего окна добавить карточку
const openPopupAddPlace = function() {
  placeInputCard.value = '';
  linkInputCard.value = '';
  showPopup(popupElementCard);
}

//открытие всплывающего окна профиля
const openPopupProfle = function() {
  nameInputProfile.value = nameElementProfile.textContent;
  aboutInputProfile.value = aboutElementProfile.textContent;
  showPopup(popupElementProfile);
}

//универсальная функция закрытия попапов
const closePopup = function(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}


//добавление крточки с местом
function addCard(data, cardTemplateSelector) {
  const cardElement = createNewCard(data, cardTemplateSelector);
  cardContainer.prepend(cardElement);
}

//создание карточек из массива
function renderCards(cards) {
  cards.forEach(card => addCard(card, '.place-card'));
}

renderCards(initialcards);

//отправка формы карточки
function submitСardHandlerForm(event) {
   event.preventDefault();
   const data = {
   name: placeInputCard.value,
   link: linkInputCard.value
   }
  addCard(data, '.place-card');
  closePopup(popupElementCard);
  buttonSubmitCard.setAttribute('disabled', true);
  buttonSubmitCard.classList.add('popup__save-button_disabled');
}

//отправка формы профиля
function submitProfileHandlerForm(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameElementProfile.textContent = nameInputProfile.value;
  aboutElementProfile.textContent = aboutInputProfile.value;
  closePopup(popupElementProfile);
}

//Закрытие всплывающего окна при нажатии на X или overlay
const closePopupOverlayOrX = () => {
  popups.forEach((popup) => {
   popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup__close-button')|| event.target.classList.contains('popup')) {
     closePopup(popup);
     }
   });
 });
 };

 closePopupOverlayOrX();

//Закрытие всплывающего окна при нажатии Esc
 function closePopupEsc(event) {
   if (event.code === 'Escape') {
       const openedPopup = document.querySelector('.popup_is-opened');
       closePopup(openedPopup);
   }
 };


//обработчик события для всплывающего окна профиля
popupOpenButtonElementProfile.addEventListener('click', openPopupProfle);

//обработчик события для всплывающего окна карточки
popupAddButtonCard.addEventListener('click', openPopupAddPlace);

//new обработчик события для всплывающего окна увеличенной карточки
popupCloseButtonZoomCard.addEventListener('click', () => closePopup(popupZoom));

//обработчик события отправки формы профиля
formElementProfile.addEventListener('submit', submitProfileHandlerForm);

//обработчик события отправки формы карточки
formElementCard.addEventListener('submit', submitСardHandlerForm);

