export default class FormValidator {
    _formElement
    _formSelector
    _inputSelector
    _submitButtonSelector
    _inactiveButtonClass
    _inputErrorClass
    _errorClass
    _formSet
    _inputList

    constructor(obj, formElement) {
        this._formElement = formElement;
        this._formSelector = obj.formSelector;
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._errorClass = obj.errorClass;
        this._formSet = obj.formSet;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((item) => {
            return !item.validity.valid;
        })
    }

    _toggleButtonState() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute("disabled", "true");
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute("disabled", "true");
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((item) => {
            item.addEventListener('input', () => {
                this._isValid(item,);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}