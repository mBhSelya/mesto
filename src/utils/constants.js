export const userId = '85bb56ad90a40e36922ff98e';

export const popupElementProfile = document.querySelector('#edit-profile');
export const popupElementAdd = document.querySelector('#add-card');
export const popupElementAvatar = document.querySelector('#edit-avatar');

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__avatar-edit');

export const cardsContainer = document.querySelector('.cards');

export const avatar = document.querySelector('.profile__avatar');

export const popupProfileName = popupElementProfile.querySelector('.popup__input_profile_name');
export const popupProfileDescription = popupElementProfile.querySelector('.popup__input_profile_description');


export const validOption = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    formSet: 'popup__set'
}