import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupElementProfile = document.querySelector('#edit-profile');
const popupElementAdd = document.querySelector('#add-card')
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const cardsContainer = document.querySelector('.cards');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupProfileName = popupElementProfile.querySelector('.popup__input_profile_name');
const popupProfileDescription = popupElementProfile.querySelector('.popup__input_profile_description');

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
    document.forms.addCard.reset();
    const inputList = Array.from(document.forms.addCard.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        new FormValidator(validOption, popupElementAdd)._hideError(inputElement);
    })
    openPopup(popupElementAdd);
}

const openProfilePopup = function() {
    const inputList = Array.from(document.forms.editProfile.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        new FormValidator(validOption, popupElementProfile)._hideError(inputElement);
    })
    popupProfileName.value = profileName.textContent;
    popupProfileDescription.value = profileDescription.textContent;
    openPopup(popupElementProfile);
}

const creatCard = function(obj, cardSelector) {
    const card = new Card(obj, cardSelector);
    const cardElement = card.generateCard();
    return cardElement;
}

function handleFormSubmit (event, popup) {
    event.preventDefault();
    closePopup(popup);
}

const handleCardFormSubmit = function(event, popup) {
    const addCard = {
        name: popupElementAdd.querySelector('.popup__input_add_name').value, 
        link: popupElementAdd.querySelector('.popup__input_add_link').value
    }
    cardsContainer.prepend(creatCard(addCard, '#card-template'));
    handleFormSubmit(event, popup);
    document.forms.addCard.reset();
    new FormValidator(validOption, popup)._toggleButtonState();
}

const handleProfileFormSubmit = function(event, popup) {
    profileName.textContent = popupProfileName.value;
    profileDescription.textContent = popupProfileDescription.value;
    handleFormSubmit(event, popup);
    const buttonElement = popup.querySelector('.popup__button-save');
    buttonElement.classList.add('popup__button-save_inactive');
    buttonElement.setAttribute("disabled", "true");
}

initialCards.forEach((item) => {
    const cardsContainer = document.querySelector('.cards');
	cardsContainer.append(creatCard(item, '#card-template'));
});

const formList = Array.from(document.querySelectorAll(validOption.formSelector));
formList.forEach((item) => {
    item.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    new FormValidator(validOption, item).enableValidation();
});

const popupAll = Array.from(document.querySelectorAll('.popup'));
popupAll.forEach((item) => {
    const closeButton = item.querySelector('.popup__button-close');
    closeButton.addEventListener('click', () => {
        closePopup(item);
    });
    item.addEventListener('click',(event) =>{
        closePopupByClickOnOverlay(event, item);  
    })
});

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddPopup);
document.addEventListener('keydown', (event) => {
    closeByEsc(event)
});
popupElementProfile.addEventListener('submit', (event) => {
    handleProfileFormSubmit(event, popupElementProfile);
});
popupElementAdd.addEventListener('submit', (event) => {
    handleCardFormSubmit(event, popupElementAdd);
});