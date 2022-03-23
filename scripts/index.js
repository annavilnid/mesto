const popupElementProfile = document.querySelector('.popup_action_edit-profile');
const popupCloseButtonElementProfile = popupElementProfile.querySelector('.popup__close-button');
const popupOpenButtonElementProfile = document.querySelector('.profile__edit-button');
const infoElementProfile = document.querySelector('.profile__info');
const nameElementProfile = infoElementProfile.querySelector('.profile__title');
const aboutElementProfile = infoElementProfile.querySelector('.profile__subtitle');
const formElementProfile = document.querySelector('.popup__form_action_edit-profile');
const nameInputProfile = formElementProfile.querySelector('.popup__input_data_name');
const aboutInputProfile = formElementProfile.querySelector('.popup__input_data_about');
const popupElementCard = document.querySelector('.popup_action_add-card');
const popupAddButtonCard = document.querySelector('.profile__add-button');
const popupCloseButtonElementCard = popupElementCard.querySelector('.popup__close-button');
const formElementCard = document.querySelector('.popup__form_action_add-card');
const placeInputCard = formElementCard.querySelector('.popup__input_data_place');
const linkInputCard = formElementCard.querySelector('.popup__input_data_place-link');
const popupZoom = document.querySelector('.popup_action_zoom-card');
const popupCloseButtonZoomCard = popupZoom.querySelector('.popup__close-button');
const imageAttribure = popupZoom.querySelector('.popup__image');
const imageDescription = popupZoom.querySelector('.popup__figcaption');
const cardContainer = document.querySelector('.elements__list');
const popups = document.querySelectorAll('.popup');
const template = document.querySelector('#card');

//сделать видимым модальное окно
const showPopup = function(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
  enebleValidation(validationSettings);
}

//открытие всплывающего окна добавить карточку
const openPopupAddPlace = function() {
  placeInputCard.value = '';
  linkInputCard.value = '';
  showPopup(popupElementCard);
}

//открытие всплывающего окна профиля
const openPopupProfle = function() {
  const name = nameElementProfile.textContent;
  const about = aboutElementProfile.textContent;
  nameInputProfile.value = name;
  aboutInputProfile.value = about;
  showPopup(popupElementProfile);
}

//универсальная функция закрытия попапов
const closePopup = function(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//отрисовка карточки с местом
function renderCard(card) {
  const cardTemplate = template.content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `Карточка местности ${card.name}`;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__remove-button').addEventListener ('click', handleDelete);
  cardElement.querySelector('.card__like-button').addEventListener ('click', handlelike);
  cardElement.querySelector('.card__image').addEventListener ('click', () => zoomClickedImage(card.link, card.name));
  return cardElement;
}

//добавление крточки с местом
function addCard(card) {
  const cardElement = renderCard(card);
  cardContainer.prepend(cardElement);
}

//создание карточек из массива
function renderCards(cards) {
  cards.forEach(card => addCard(card));
}

renderCards(initialcards);

//отправка формы карточки
function submitСardHandlerForm(event) {
   event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Получите значение полей jobInput и nameInput из свойства value
   const card = {
   name: placeInputCard.value,
   link: linkInputCard.value
   }
  addCard(card);
  closePopup(popupElementCard);
}

//отправка формы профиля
function submitProfileHandlerForm(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameElementProfile.textContent = nameInputProfile.value;
  aboutElementProfile.textContent = aboutInputProfile.value;
  closePopup(popupElementProfile);
}

//удаление карточки
function handleDelete(event) {
 const cardElement = event.target.closest('.card');
 cardElement.remove()
}

//поставить лайк карточке
function handlelike(event) {
  const cardElement = event.target.closest('.card__like-button');
  cardElement.classList.toggle('card__like-button_active')
}

//увеличить выбранную картинку
function zoomClickedImage (link, name) {
  imageAttribure.setAttribute('src', link);
  imageAttribure.setAttribute('alt', name);
  imageDescription.textContent = name;
  showPopup(popupZoom)
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


