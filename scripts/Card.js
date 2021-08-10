export default class Card {
    constructor(obj, cardSelector, openImagePopup) {
        this._image = obj.link;
        this._name = obj.name;
        this._cardSelector = cardSelector;
        this._openImagePopup = openImagePopup;
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
            this._openImagePopup(this._image, this._name);
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
