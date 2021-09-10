import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
    }

    open(item, card) {
        super.open();
        this._item = item;
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(this._item, this._card);
        })
    }
}