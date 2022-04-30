export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  //открытие попапа
  open() {
    this._popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа
  close() {
    this._popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа Esc
  _handleEscClose(event) {
      if (event.code === 'Escape') {
          this.close();
      }
  }

  //закрытие попапа при нажатии на X или overlay
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup__close-button')|| event.target.classList.contains('popup')) {
          this.close();
        }
      });
  }
}

