import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {submitHandlerForm}) {
        super(popupSelector);
        this._submitHandlerForm = submitHandlerForm;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    //собирает данные всех полей формы.
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    //добавляет обработчик клика иконке закрытия, добавляет обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitHandlerForm(this._getInputValues());
            this._form.reset();
        });
    }

    //перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    close() {
        super.close();
        this._form.reset();
    }
}
