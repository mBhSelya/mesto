
const showError = function(formElement, inputElement, errorMessage, objOption) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(objOption.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objOption.errorClass);
}

const hideError = function(formElement, inputElement, objOption) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(objOption.inputErrorClass);
    errorElement.classList.remove(objOption.errorClass);
    errorElement.textContent = '';
}

const isValid = function(formElement, inputElement, objOption) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, objOption);
    } else {
        hideError(formElement, inputElement, objOption);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement, objOption) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(objOption.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "true");
    } else {
        buttonElement.classList.remove(objOption.inactiveButtonClass);
        buttonElement.removeAttribute("disabled", "true");
    }
}

const setEventListeners = (formElement, objOption) => {
    const inputList = Array.from(formElement.querySelectorAll(objOption.inputSelector));
    const buttonElement = formElement.querySelector(objOption.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, objOption);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, objOption);
            toggleButtonState(inputList, buttonElement, objOption);
        });
    });
}


const enableValidation = (objOption) => {
    const formList = Array.from(document.querySelectorAll(objOption.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, objOption);
        const fieldsetList = Array.from(formElement.querySelectorAll(objOption.formSet));
        fieldsetList.forEach((fieldset) => {
            setEventListeners(fieldset);
        })
    });
}

enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    formSet: 'popup__set'
});

