import {
    popupElementProfile,
    popupElementAdd,
    popupElementAvatar,
    editButton,
    addButton,
    editAvatarButton,
    cardsContainer,
    avatar,
    popupProfileName,
    popupProfileDescription,
    userId,
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

const editForm = new FormValidator(validOption, popupElementProfile);
const addForm = new FormValidator(validOption, popupElementAdd);
const editAvatarForm = new FormValidator(validOption, popupElementAvatar);
const popupImage = new PopupWithImage('#open-image');
const deletePopup = new PopupConfirmDelete('#delete-card', (item, card) => {
    api.deleteCard(item)
        .then(() => {
            card.deleteCard();
        })
    deletePopup.close(item, card);
});

const userInfo = new UserInfo({
    nickname: '.profile__name',
    description: '.profile__description'
});


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
        'Content-Type': 'application/json'
    }
});

api.getInfoUser()
    .then((res) => {
        userInfo.setUserInfo(res);
        avatar.src = `${res.avatar}`
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then((res) => {
        const cardsList = new Section({
            items: res,
            renderer: (item) => cardsList.setItem(createCard(item))
        }, '.cards');
        cardsList.renderItems();
    })
    .catch((err) => {
        console.log(err);
    });

const editPopup = new PopupWithForm('#edit-profile', (values) => {
    editPopup.renderLoading(true, 'Сохранить', 'Сохранение...');
    api.sendUserInfo(values)
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            editPopup.renderLoading(false, 'Сохранить', 'Сохранение...');
        })
    editPopup.close();
});

const addPopup = new PopupWithForm('#add-card', (values) => {
    addPopup.renderLoading(true, 'Создать', 'Создание...');
    api.postNewCard(values)
        .then((res) => {
                cardsContainer.prepend(createCard(res));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            addPopup.renderLoading(false, 'Создать', 'Создание...');
        })
        addPopup.close();
});

const editAvatarPopup = new PopupWithForm('#edit-avatar', (value) => {
    editAvatarPopup.renderLoading(true, 'Сохранить', 'Сохранение...');
    api.editAvatar(value)
        .then((res) => {
            avatar.src = `${res.avatar}`
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            editAvatarPopup.renderLoading(false, 'Сохранить', 'Сохранение...');
        })
    editAvatarPopup.close();
})

function createCard(item) {
    const card = new Card(item, userId, '#card-template', {
        handleCardClick: (link, name) => {
            popupImage.open(link, name);
        },
        handleDeleteCard: () => {
            deletePopup.open(item._id, card);
            deletePopup.setEventListeners(item._id, card);
        },
        handleLikeCard: () => {
            card.likeCard(() => {
                api.setLikeCard(item._id)
                    .then((res) => {
                        card.countLikes(res.likes.length);
                    })
            },
            () => {
                api.deleteLikeCard(item._id)
                    .then((res) => {
                        card.countLikes(res.likes.length);
                    })
            })
        }
    });
    return card.generateCard();
}


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