export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event)
        });
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (event) => {
            this._handleEscClose(event);
        });
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            this.close(openedPopup);
        }
    }

    _handleOverlayClose(event) {
        if (event.target !== event.currentTarget) {
            return
        }
        this.close(this._popup);
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__button-close');
        closeButton.addEventListener('click', () => {
            this.close(this._popup);
        });

        this._popup.addEventListener('click', (event) =>{
            this._handleOverlayClose(event);
        })
    }
}