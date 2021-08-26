import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
    constructor(link, name, popupSelector) {
        super(popupSelector);
        this._link = link;
        this._name = name;
    }

    open() {
        super.setEventListeners();
        const popupImage = this._popup.querySelector('.popup__image');
        const popupSignature = this._popup.querySelector('.popup__signature');
        popupImage.src = this._link;
        popupImage.alt = `Фото ${this._name}`;
        popupSignature.textContent = this._name;
        super.open();
    }
}