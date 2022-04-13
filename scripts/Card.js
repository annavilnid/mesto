import { popupZoom, imageAttribure, imageDescription } from './constants.js';
import { showPopup } from './index.js';

export class Card {
  constructor(data, cardTemplateSelector) {
    this._cardTemplateSelector = document.querySelector(cardTemplateSelector);
    this._cardTemplate = this._cardTemplateSelector.content;
    this._name = data.name;
    this._link = data.link;
  }

  //удалить каpточку
  _handleDelete = () => {
    this._cardElement.remove()
   }


  //поставить лайк карточке
  _handlelike = () => {
  this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
}
  //увеличить карточку
  _zoomClickedImage = () => {
  imageAttribure.setAttribute('src', this._link);
  imageAttribure.setAttribute('alt', this._name);
  imageDescription.textContent = this._name;
  showPopup(popupZoom)
}

  _setEventListeners() {
    //слушатель удаления карточки
    this._cardElement.querySelector('.card__remove-button').addEventListener ('click', this._handleDelete);
    //слушатель поставить лайк карточке
    this._cardElement.querySelector('.card__like-button').addEventListener ('click', this._handlelike);
    //слушатель увеличить карточку
    this._cardElement.querySelector('.card__image').addEventListener ('click', () => this._zoomClickedImage());
  }


  returnCard(){
    this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);

    this._cardElement.querySelector('.card__image').src = this._link;
    this._cardElement.querySelector('.card__image').alt = `Карточка местности ${this._name}`;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
