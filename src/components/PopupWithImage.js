import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {

    open(link, name) {
        super.setEventListeners();
        const popupImage = this._popup.querySelector('.popup__image');
        const popupSignature = this._popup.querySelector('.popup__signature');
        popupImage.src = link;
        popupImage.alt = `Фото ${name}`;
        popupSignature.textContent = name;
        super.open();
    }
}