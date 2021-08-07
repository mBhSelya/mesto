export default class Card {
    _image
    _name
    _cardSelector

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

    _cardLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _openImagePopup() {
        const popupImage = document.querySelector('#open-image');
        popupImage.querySelector('.popup__image').src = this._image;
        popupImage.querySelector('.popup__image').alt = `Фото ${this._name}`;
        popupImage.querySelector('.popup__signature').textContent = this._name;
        popupImage.classList.add('popup_opened');
    }
    
    _setEventListeners() {
        const deleteButton = this._element.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => {
            deleteButton.closest('.card').remove();
        });

        const cardLike = this._element.querySelector('.card__like');
        cardLike.addEventListener('click', () => {
            this._cardLike();
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
