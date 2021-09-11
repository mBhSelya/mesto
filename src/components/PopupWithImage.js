import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupSignature = this._popup.querySelector('.popup__signature');
    }

    open(link, name) {
        this._popupImage.src = link;
        this._popupImage.alt = `Фото ${name}`;
        this._popupSignature.textContent = name;
        super.open();
    }
}