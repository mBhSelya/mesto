export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if (event.target === event.currentTarget) this.close();
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__button-close');
        closeButton.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('click', (event) =>{
            this._handleOverlayClose(event);
        })
    }
}