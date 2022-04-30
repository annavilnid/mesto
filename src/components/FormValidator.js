
export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
  }

  _showError = (inputElement, errorMessage) => {
    const { inputErrorClass, errorClass } = this._settings
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideError = (inputElement) => {
    const { inputErrorClass, errorClass } = this._settings
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };


  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  };

  disableSubmitButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._settings.submitButtonDisabled);
}

  enableSubmitButton() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._settings.submitButtonDisabled);
}

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
        this.disableSubmitButton();
    } else {
        this.enableSubmitButton();
    }
  }

  resetErrors() {
    this._inputList.forEach((inputElement) => {
        this._toggleButtonState();
        this._hideError(inputElement);
    });
}

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkValidity(inputElement)
            this._toggleButtonState();
        });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };

}


