import { openModal, closeModal, setupPopupClose } from './popup.js';
import { placesList } from './index.js';
import { appendCard } from './server.js';

const cardTemplate = document.querySelector('#card-template').content;
export function createCard(name, link, likes, flag, id) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__likes').textContent = likes;
    cardElement.querySelector('.card__id').textContent = id;

    if (flag != true) {
        cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_inactive');
    }
  
    return cardElement;
}

const cardPopup = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupFormCardPopup = cardPopup.querySelector('.popup__form');

profileAddButton.addEventListener('click', () => {
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name').value;
    const popupInputTypeUrl = document.querySelector('.popup__input_type_url').value;

    appendCard(popupInputTypeCardName, popupInputTypeUrl)
    .then(id => {
        placesList.prepend(createCard(popupInputTypeCardName, popupInputTypeUrl, 0, true, id));
    });
    closeModal(cardPopup);
}

popupFormCardPopup.addEventListener('submit', handleCardFormSubmit);
setupPopupClose(cardPopup);