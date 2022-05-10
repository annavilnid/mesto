import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitHandlerForm}) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  //собирает данные всех полей формы.
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  //добавляет обработчик клика иконке закрытия, добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandlerForm(this._getInputValues());
    });
  }

  //перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }
}
