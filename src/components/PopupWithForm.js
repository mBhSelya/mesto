import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
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
        this._popup.querySelector('.popup__container').reset();
        this._popup.removeEventListener('submit', (event) => {
            this._submit(event);
        })
    }

    renderLoading(isLoading, textDefault, textLoading) {
        const submitButton = this._popup.querySelector('.popup__button-save');
        if (isLoading) {
            submitButton.textContent = textLoading;
        } else {
            submitButton.textContent = textDefault;
        }
    }
}