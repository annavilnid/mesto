import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
  }


  //Перезаписывает родительский метод setEventListeners (добавлен вызов функции при сабмите)
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandlerForm()
    })
  }

  setSubmitAction(action) {
    this._submitHandlerForm = action
  }
}



