export default class Card {
    constructor(obj, ID, cardSelector, {handleCardClick, handleDeleteCard, handleLikeCard}) {
        this._image = obj.link;
        this._name = obj.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
        this._owner = obj.owner;
        this._likes = obj.likes;
        this._userID = ID;

    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    countLikes(count) {
        this._countLikes.textContent = count;
    }

    likeCard(trueLike, falseLike) {
        const likeIcon = this._element.querySelector('.card__like-icon');
        const like = likeIcon.classList.contains('card__like-icon_active');
        if (like) {
            falseLike();
            likeIcon.classList.remove('card__like-icon_active');
        } else {
            trueLike();
            likeIcon.classList.add('card__like-icon_active');
        }
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }
    
    _setEventListeners() {
        const deleteButton = this._element.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => {
            this._handleDeleteCard();
        });

        const cardLike = this._element.querySelector('.card__like');
        cardLike.addEventListener('click', () => {
            this._handleLikeCard();
        });
        
        const cardImage = this._element.querySelector('.card__image');
        cardImage.addEventListener('click', () => {
            this._handleCardClick(this._image, this._name);
        });
        
	}

    generateCard() {
        this._element = this._getTemplate();
        this._countLikes = this._element.querySelector('.card__like-counter');
        this._cardImage = this._element.querySelector('.card__image');
        this._setEventListeners();
        

        if (this._owner._id !== this._userID) {
            const deleteButton = this._element.querySelector('.card__delete-button');
            deleteButton.classList.add('card__delete-button_owner');
        }


        this._likes.forEach((item) => {
            if (item._id === this._userID) {
                this._element.querySelector('.card__like-icon').classList.add('card__like-icon_active');
            }
        })
        
        this._cardImage.src = this._image;
        this._cardImage.alt = `Фото ${this._name}`;
        
        this._element.querySelector('.card__title').textContent = this._name;
        this._countLikes.textContent = this._likes.length;

        return this._element;
    }
}