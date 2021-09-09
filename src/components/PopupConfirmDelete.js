import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
    }

    open() {
        super.open();
    }

    setEventListeners(item, card) {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(item, card);
        },
        {once: true})
    }

    close() {
        super.close();
    }
}