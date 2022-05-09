export class Card {
  constructor({ cardData, handleCardClick, handleDeleteClick, handleLikeClick, handleDislikeClick}, cardTemplateSelector, userId) {
    this._cardTemplateSelector = document.querySelector(cardTemplateSelector);
    this._cardTemplate = this._cardTemplateSelector.content;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._userId = userId;
    this._ownerId = cardData.owner._id;
    this._owner = cardData.owner;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
    this._userId = userId;
  }
  
  //получить актуальный массив лайков
  getLikesArr = (likesData) => {
    this._likes = likesData
  }

  //удалить каpточку
  handleDelete = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //поставить лайк карточке
  handlelike = () => {
    this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  renderLikeFunctionClick = () => {
    if (this.isOwnerLiked()) {
      this._handleDislikeClick()
    } else {
      this._handleLikeClick()
    }
  }

  //счетчик лайков
  contLikes = (arr) => {
  this._cardElement.querySelector('.card__like-counter').textContent = arr.length;
  }

  //Метод для определения, поставил ли лайк текущий пользователь
  isOwnerLiked = () => {
    console.log('isOwnerLiked');
    console.log(this._likes);
    const result = this._likes.some((data) => {
      return data._id === this._userId});
      console.log(result);
    return result;

  }


  //добавить слушателей
  _setEventListeners() {
    //слушатель удаления карточки
    this._cardElement.querySelector('.card__remove-button').addEventListener ('click', () => this.handleDeleteClick());
    //слушатель поставить лайк карточке
    this._cardElement.querySelector('.card__like-button').addEventListener ('click', this.renderLikeFunctionClick);
    //слушатель увеличить карточку
    this._cardElement.querySelector('.card__image').addEventListener ('click', () => this.handleCardClick());
  }



  //возвращает готовую карточку
  returnCard(){
    this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
    this._cardElement.querySelector('.card__image').src = this._link;
    this._cardElement.querySelector('.card__image').alt = `Карточка местности ${this._name}`;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    //счетчик лайков
    this.contLikes(this._likes);

    //убираем кнопку удаления у чужих карточек
    if(!(this._ownerId === this._userId)) {
      this._cardElement.querySelector('.card__remove-button').style.display = 'none'
    }

    //проверяем в каком состоянии отрисовывать кнопку лайком при загрузке
    if (this.isOwnerLiked()) {
      this._cardElement.querySelector('.card__like-button').classList.add('card__like-button_active');
    }


    this._setEventListeners();
    return this._cardElement;
  }
}


