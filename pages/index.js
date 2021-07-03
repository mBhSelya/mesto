const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__button-close');
const popupName = popupElement.querySelector('.popup__input_type_name');
const popupDescription = popupElement.querySelector('.popup__input_type_description');
const popupTitle = popupElement.querySelector('.popup__title');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const popupElementImage = document.querySelector('#open-image');
const closeButtonImage = popupElementImage.querySelector('.popup__button-close');

let initialCards = [
    {
        name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const sortArray = function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = `Фото ${item.name}`;
    cardsContainer.prepend(cardElement);
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        const deleteCard = deleteButton.closest('.card');
        const deleteArrayElementName = deleteCard.querySelector('.card__title').textContent;
        const deleteArrayElementLink = deleteCard.querySelector('.card__image').src;
        const deleteArrayElement = [{name: `${deleteArrayElementName}`, link: `${deleteArrayElementLink}`}];
        initialCards = initialCards.filter((x) => deleteArrayElement.some((y) => x.name !== y.name));
        deleteCard.remove();
    })

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        popupElementImage.classList.add('popup_opened');
        popupElementImage.querySelector('.popup__image').src = item.link;
        popupElementImage.querySelector('.popup__image').alt = `Фото ${item.name}`;
        popupElementImage.querySelector('.popup__signature').textContent = item.name;
    })

    const cardLike = cardElement.querySelector('.card__like');
    cardLike.addEventListener('click', () => {
        cardLike.classList.toggle('card__like_active');
    })
}

initialCards.reverse().forEach(sortArray);

const openPopup = function(event) {
    if (event.target === editButton) {
        popupTitle.textContent = 'Редактировать профиль';
        popupName.placeholder = 'Имя';
        popupDescription.placeholder = 'Вид деятельности';
    } else if (event.target === addButton) {
        popupTitle.textContent = 'Новое место';
        popupName.placeholder = 'Название';
        popupDescription.placeholder = 'Ссылка на картинку';
    }
    popupElement.classList.add('popup_opened');
}

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
    popupElementImage.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function(event) {
    if (event.target !== event.currentTarget) {
        return
    }
    closePopup();
}

function formSubmitHandler (event) {
    event.preventDefault();
    if (popupTitle.textContent === 'Редактировать профиль') {
        profileName.textContent = popupName.value;
        profileDescription.textContent = popupDescription.value;
    } else if (popupTitle.textContent === 'Новое место') {
        addCard();
        sortArray(initialCards[0]);
    }
    closePopup();
}

const addCard = function() {
    initialCards.unshift({name: popupName.value, link: popupDescription.value});
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
closeButtonImage.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupElementImage.addEventListener('click', closePopupByClickOnOverlay);
popupElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openPopup);