const popupElement = document.querySelector(`.popup`);
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__button-close');
const popupName = popupElement.querySelector('.popup__input-name')
const popupDescription = popupElement.querySelector('.popup__input-description')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const popupOpen = function() {
    popupElement.classList.add('popup_opened')
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}

const popupClose = function() {
    popupElement.classList.remove('popup_opened')
}

const popupCloseByClickOnOverlay = function(event) {
    if (event.target !== event.currentTarget) {
        return
    }
    
    popupClose();
}

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popupElement.addEventListener('click', popupCloseByClickOnOverlay);
popupElement.addEventListener('submit', formSubmitHandler); 
