import { openImagePopup } from './imagePopup.js';
import { editProfile } from './profile.js';
import { enableValidation } from './validForm.js';
import { serverUser, serverCards, addLike, deleteLike, deleteCard } from './server.js';
import '../pages/index.css';


export const placesList = document.querySelector('.places__list');

placesList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__like-button')) {
        
        if (evt.target.classList.contains('card__like-button_is-active')) {
            evt.target.classList.remove('card__like-button_is-active');
            deleteLike(evt.target.parentElement.parentElement.querySelector('.card__id').textContent);
        } else {
            evt.target.classList.add('card__like-button_is-active');
            addLike(evt.target.parentElement.parentElement.querySelector('.card__id').textContent);
            
        }
        
    }
    if (evt.target.classList.contains('card__delete-button')) {
        evt.target.closest('.places__item').remove();
        deleteCard(evt.target.parentElement.querySelector('.card__id').textContent);
    }
    if (evt.target.classList.contains('card__image')) {
        openImagePopup(evt.target.alt, evt.target.src);
    }
});

editProfile();
enableValidation();
serverUser();
serverCards();