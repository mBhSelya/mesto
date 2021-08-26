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
            this._submit(event);
        });
    }

    close() {
        super.close();
        const nameForm = this._popup.querySelector('.popup__container').name;
        if (nameForm === 'editProfile') {
            document.forms.editProfile.reset();
        } else if (nameForm === 'addForm') {
            document.forms.addCard.reset();
        }
        this._popup.removeEventListener('submit', (event) => {
            this._submit(event);
        })
    }
}