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



const initialcards = [
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

//сделать видимым модальное окно
const showPopup = function(element) {
  element.classList.add('popup_is-opened')
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

//закрытие всплывающего окна
const closePopup = function(element) {
  element.classList.remove('popup_is-opened')
}

function renderCard(card) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `Карточка местности ${card.name}`;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__remove-button').addEventListener ('click', handleDelete);
  cardElement.querySelector('.card__like-button').addEventListener ('click', handlelike);
  cardElement.querySelector('.card__image').addEventListener ('click', () => zoomClickedImage(card.link, card.name));
  return cardElement;
}

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
function submitСardHandlerForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Получите значение полей jobInput и nameInput из свойства value
   const card = {
    name: placeInputCard.value,
    link: linkInputCard.value
  }
  addCard(card);
  closePopup(popupElementCard);
 }

//отправка формы профиля
function submitProfileHandlerForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
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

//обработчик события для всплывающего окна профиля
popupOpenButtonElementProfile.addEventListener('click', openPopupProfle);
popupCloseButtonElementProfile.addEventListener('click', () => closePopup(popupElementProfile));

//обработчик события для всплывающего окна карточки
popupAddButtonCard.addEventListener('click', openPopupAddPlace);
popupCloseButtonElementCard.addEventListener('click', () => closePopup(popupElementCard));

//new обработчик события для всплывающего окна увеличенной карточки
popupCloseButtonZoomCard.addEventListener('click', () => closePopup(popupZoom));

//обработчик события отправки формы профиля
formElementProfile.addEventListener('submit', submitProfileHandlerForm);

//обработчик события отправки формы карточки
formElementCard.addEventListener('submit', submitСardHandlerForm);

//new обработчик события для всплывающего окна увеличенной карточки
popupCloseButtonZoomCard.addEventListener('click', () => closePopup(popupZoom));
