import { openModal, setupPopupClose } from './popup.js';

const imagePopup = document.querySelector('.popup_type_image');
const popupImageElement = imagePopup.querySelector('.popup__image');
const popupCaptionElement = imagePopup.querySelector('.popup__caption');

export function openImagePopup(name, link) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaptionElement.textContent = name;
    openModal(imagePopup);
}

setupPopupClose(imagePopup);