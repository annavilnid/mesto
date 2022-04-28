export default class Popup {
  constructor(popupSelector) {
    //this._popupSelector = popupSelector;
    this._popupSelector= document.querySelector(popupSelector);
  }

  //открытие попапа
  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', (event) => this._handleEscClose(event));
  }

  //закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', (event) => this._handleEscClose(event));
  }

  //закрытие попапа Esc
  _handleEscClose(event) {
      if (event.code === 'Escape') {
          this.close();
      }
  }

  //закрытие попапа при нажатии на X или overlay
  setEventListeners() {
      this._popupSelector.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup__close-button')|| event.target.classList.contains('popup')) {
          this.close();
        }
      });
  }
}

