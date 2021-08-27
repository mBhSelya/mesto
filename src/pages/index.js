import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    popupElementProfile,
    popupElementAdd,
    editButton,
    addButton,
    cardsContainer,
    popupProfileName,
    popupProfileDescription,
    initialCards,
    validOption
} from "../utils/constants.js";
import "./index.css"

const editForm = new FormValidator(validOption, popupElementProfile);
const addForm = new FormValidator(validOption, popupElementAdd);
const userInfo = new UserInfo({
    nickname: '.profile__name',
    description: '.profile__description'
});
const popupImage = new PopupWithImage('#open-image');

const editPopup = new PopupWithForm('#edit-profile', (values) => {
    userInfo.setUserInfo(values);
    event.preventDefault();
    editPopup.close();
});

const addPopup = new PopupWithForm('#add-card', (values) => {
    const card = new Card(
        values,
        '#card-template',
        (link, name) =>  popupImage.open(link, name) 
        );
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
    event.preventDefault();
    addPopup.close();
});


const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(
            item,
            '#card-template',
            (link, name) =>  popupImage.open(link, name)  
            );
        const cardElement = card.generateCard();
        cardsList.setItem(cardElement);
        }
}, '.cards');

cardsList.renderItems();
editPopup.setEventListeners();
addPopup.setEventListeners();

addForm.enableValidation();
editForm.enableValidation();

editButton.addEventListener('click', () => {
    document.forms.editProfile.reset();
    editForm.toggleButtonState();
    editForm.hideErrors();
    const getUserInfo = userInfo.getUserInfo();
    popupProfileName.value = getUserInfo.name;
    popupProfileDescription.value = getUserInfo.description;
    editPopup.open();
});
addButton.addEventListener('click', () => {
    document.forms.addCard.reset();
    addForm.toggleButtonState();
    addForm.hideErrors();
    addPopup.open();
});
