const popupElement = document.querySelector(`.popup`);
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__button-close');
const popupName = popupElement.querySelector('.popup__input_type_name')
const popupDescription = popupElement.querySelector('.popup__input_type_description')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const openPopup = function() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    popupElement.classList.add('popup_opened');
}

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function(event) {
    if (event.target !== event.currentTarget) {
        return
    }
    
    closePopup();
}

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupElement.addEventListener('submit', formSubmitHandler); 
