import {
    popupElementProfile,
    popupElementAdd,
    popupElementAvatar,
    editButton,
    addButton,
    editAvatarButton,
    popupProfileName,
    popupProfileDescription,
    validOption
} from "../utils/constants.js";
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';
import UserInfo from '../components/UserInfo.js';
import "./index.css"

let userId;

const editForm = new FormValidator(validOption, popupElementProfile);
const addForm = new FormValidator(validOption, popupElementAdd);
const editAvatarForm = new FormValidator(validOption, popupElementAvatar);
const popupImage = new PopupWithImage('#open-image');
const deletePopup = new PopupConfirmDelete('#delete-card', (item, card) => {
    api.deleteCard(item._id)
        .then(() => {
            card.deleteCard();
            deletePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
});

const userInfo = new UserInfo({
    nickname: '.profile__name',
    description: '.profile__description',
    avatar: '.profile__avatar',
    userId: userId
});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/',
    headers: {
        authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
        'Content-Type': 'application/json'
    }
});

const cardsList = new Section({
    renderer: (item) => cardsList.appendItem(createCard(item))
}, '.cards');

Promise.all([api.getInfoUser(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        cardsList.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(err);
    })

const editPopup = new PopupWithForm('#edit-profile', (values) => {
    editPopup.renderLoading(true, 'Сохранить', 'Сохранение...');
    api.sendUserInfo(values)
        .then((res) => {
            userInfo.setUserInfo(res);
            editPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            editPopup.renderLoading(false, 'Сохранить', 'Сохранение...');
        })
});

const addPopup = new PopupWithForm('#add-card', (values) => {
    addPopup.renderLoading(true, 'Создать', 'Создание...');
    api.postNewCard(values)
        .then((res) => {
            cardsList.prependItem(createCard(res));
            addPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            addPopup.renderLoading(false, 'Создать', 'Создание...');
        })
});

const editAvatarPopup = new PopupWithForm('#edit-avatar', (value) => {
    editAvatarPopup.renderLoading(true, 'Сохранить', 'Сохранение...');
    api.editAvatar(value)
        .then((res) => {
            userInfo.setUserInfo(res);
            editAvatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            editAvatarPopup.renderLoading(false, 'Сохранить', 'Сохранение...');
        })
})

function createCard(item) {
    const card = new Card(item, userId, '#card-template', {
        handleCardClick: (link, name) => {
            popupImage.open(link, name);
        },
        handleDeleteCard: () => {
            deletePopup.open(item, card);
        },
        handleLikeCard: () => {
            card.likeCard(() => {
                api.setLikeCard(item._id)
                    .then((res) => {
                        card.countLikes(res.likes.length);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            () => {
                api.deleteLikeCard(item._id)
                    .then((res) => {
                        card.countLikes(res.likes.length);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        }
    });
    return card.generateCard();
}

deletePopup.setEventListeners();
popupImage.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
editAvatarPopup.setEventListeners();

addForm.enableValidation();
editForm.enableValidation();
editAvatarForm.enableValidation();

editButton.addEventListener('click', () => {
    editForm.toggleButtonState();
    editForm.hideErrors();
    const getUserInfo = userInfo.getUserInfo();
    popupProfileName.value = getUserInfo.name;
    popupProfileDescription.value = getUserInfo.description;
    editPopup.open();
});

addButton.addEventListener('click', () => {
    addForm.toggleButtonState();
    addForm.hideErrors();
    addPopup.open();
});

editAvatarButton.addEventListener('click', () => {
    editAvatarForm.toggleButtonState();
    editAvatarForm.hideErrors();
    editAvatarPopup.open();
})