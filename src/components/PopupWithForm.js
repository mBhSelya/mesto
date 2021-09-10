import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__container');
        this._submitButton = this._popup.querySelector('.popup__button-save');
    }

    _getInputValues() {
        this._popupValues = {};
        this._inputList.forEach((input) => {
            this._popupValues[input.name] = input.value
        });
        return this._popupValues;
      }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading, textDefault, textLoading) {
        if (isLoading) {
            this._submitButton.textContent = textLoading;
        } else {
            this._submitButton.textContent = textDefault;
        }
    }
}