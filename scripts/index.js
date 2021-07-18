const popupElementProfile = document.querySelector('#edit-profile');
const popupElementAdd = document.querySelector('#add-card')
const popupElementImage = document.querySelector('#open-image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonProfile = popupElementProfile.querySelector('.popup__button-close');
const closeButtonAdd = popupElementAdd.querySelector('.popup__button-close');
const closeButtonImage = popupElementImage.querySelector('.popup__button-close');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupProfileName = popupElementProfile.querySelector('.popup__input_profile_name');
const popupProfileDescription = popupElementProfile.querySelector('.popup__input_profile_description');
const popupAddName = popupElementAdd.querySelector('.popup__input_add_name');
const popupAddLink = popupElementAdd.querySelector('.popup__input_add_link');

const escapeKeyCode = 'Escape';


const openPopup = function(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

const closePopup = function(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

const closeByEsc = function(event) {
    if (event.key === escapeKeyCode) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const closePopupByClickOnOverlay = function(event, popup) {
    if (event.target !== event.currentTarget) {
        return
    }
    closePopup(popup);
}

const openAddPopup = function() {
    popupAddName.value = '';
    popupAddLink.value = '';
    openPopup(popupElementAdd);
}

const openProfilePopup = function() {
    popupProfileName.value = profileName.textContent;
    popupProfileDescription.value = profileDescription.textContent;
    openPopup(popupElementProfile);
}

const openImagePopup = function(item) {
    popupElementImage.querySelector('.popup__image').src = item.link;
    popupElementImage.querySelector('.popup__image').alt = `Фото ${item.name}`;
    popupElementImage.querySelector('.popup__signature').textContent = item.name;
    openPopup(popupElementImage);
}

const closeImagePopup = function() {
    closePopup(popupElementImage);
}

const closeProfilePopup = function() {
    closePopup(popupElementProfile);
}

const closeAddPopup = function() {
    closePopup(popupElementAdd);
}

function formSubmitHandler (event, popup) {
    event.preventDefault();
    closePopup(popup);
}

const formSubmitHandlerAdd = function(event, popup) {
    const addCard = {
        name: popupElementAdd.querySelector('.popup__input_add_name').value, 
        link: popupElementAdd.querySelector('.popup__input_add_link').value
    }
    cardsContainer.prepend(createCard(addCard));
    formSubmitHandler(event, popup);
}

const formSubmitHandlerProfile = function(event, popup) {
    profileName.textContent = popupProfileName.value; 
    profileDescription.textContent = popupProfileDescription.value;
    formSubmitHandler(event, popup);
}


const createCard = function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = `Фото ${item.name}`;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteButton.closest('.card').remove();
    });
    
    const cardLike = cardElement.querySelector('.card__like');
    cardLike.addEventListener('click', () => {
        cardLike.classList.toggle('card__like_active');
    });

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        openImagePopup(item);
    });

    return cardElement;
}

initialCards.forEach((item) => {
    cardsContainer.prepend(createCard(item));
});

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddPopup);
closeButtonImage.addEventListener('click', closeImagePopup);
closeButtonProfile.addEventListener('click', closeProfilePopup);
closeButtonAdd.addEventListener('click', closeAddPopup);
popupElementAdd.addEventListener('click', () => {
    closePopupByClickOnOverlay(event, popupElementAdd);
});
popupElementProfile.addEventListener('click', () => {
    closePopupByClickOnOverlay(event, popupElementProfile);
});
popupElementImage.addEventListener('click', () => {
    closePopupByClickOnOverlay(event, popupElementImage);
});

popupElementProfile.addEventListener('submit', () => {
    formSubmitHandlerProfile(event, popupElementProfile);
});

popupElementAdd.addEventListener('submit', () => {
    formSubmitHandlerAdd(event, popupElementAdd);
});