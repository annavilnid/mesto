//переменные
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const infoElement = document.querySelector('.profile__info');
const nameElement = infoElement.querySelector('.profile__title');
const aboutElement = infoElement.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-name');
const aboutInput = formElement.querySelector('.popup__form-about');
const popupSaveButtonElement = popupElement.querySelector('.popup__save-button');

//открытие всплывающего окна
const openPopup = function() {
  const name = nameElement.textContent;
  const about = aboutElement.textContent;
  nameInput.value = name;
  aboutInput.value = about;
  popupElement.classList.add('popup_is-opened')
  console.log('Open popup clicked')
}

//закрытие всплывающего окна
const closePopup = function() {
  popupElement.classList.remove('popup_is-opened')
  console.log('popup closed')
}

//обработчик события для всплывающего окна
popupOpenButtonElement.addEventListener('click', openPopup); 
popupCloseButtonElement.addEventListener('click', closePopup); 

//отправка формы
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const valueNameInput = nameInput.value;
    const valueAboutInput = aboutInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const newNameElement = nameElement;
    const newAboutElement = aboutElement;
    // Вставьте новые значения с помощью textContent
    newNameElement.textContent = valueNameInput;
    newAboutElement.textContent = valueAboutInput;
    closePopup();
    console.log ('form send');
}

//обработчик события отправки формы
formElement.addEventListener('submit', formSubmitHandler); 
