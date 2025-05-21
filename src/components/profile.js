import { openModal, closeModal, setupPopupClose } from './popup.js';
import { updateUser } from './server.js';

const profilePopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupFormTypeEdit = profilePopup.querySelector('.popup__form');

export function editProfile() {
    profileEditButton.addEventListener('click', () => {
        const profileTitle = document.querySelector('.profile__title').textContent;
        const profileDescription = document.querySelector('.profile__description').textContent;
        
        const popupInputTypeName = document.querySelector('.popup__input_type_name');
        popupInputTypeName.value = profileTitle;

        const popupInputTypeDescription = document.querySelector('.popup__input_type_description');
        popupInputTypeDescription.value = profileDescription;

        openModal(profilePopup);
    });
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const popupInputTypeName = document.querySelector('.popup__input_type_name').value;
    const popupInputTypeDescription = document.querySelector('.popup__input_type_description').value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = popupInputTypeName;
    profileDescription.textContent = popupInputTypeDescription;

    closeModal(profilePopup);

    updateUser(popupInputTypeName, popupInputTypeDescription);
}

popupFormTypeEdit.addEventListener('submit', handleProfileFormSubmit);
setupPopupClose(profilePopup);