

export default class Card {
    constructor(obj, cardSelector) {
        this._image = obj.link;
        this._name = obj.name;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    _likeCard() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _openImagePopup() {
        const popupImageContainer = document.querySelector('#open-image');
        const popupImage = popupImageContainer.querySelector('.popup__image');
        popupImage.src = this._image;
        popupImage.alt = `Фото ${this._name}`;
        popupImageContainer.querySelector('.popup__signature').textContent = this._name;
        popupImageContainer.classList.add('popup_opened');
    }
    
    _setEventListeners() {
        const deleteButton = this._element.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });

        const cardLike = this._element.querySelector('.card__like');
        cardLike.addEventListener('click', () => {
            this._likeCard();
        });
        
        const cardImage = this._element.querySelector('.card__image');
        cardImage.addEventListener('click', () => {
            this._openImagePopup();
        });
	}

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = `Фото ${this._name}`;
        
        this._element.querySelector('.card__title').textContent = this._name;
    
        return this._element;
    }
}
