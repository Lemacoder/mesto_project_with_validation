export function openModal(popup) {      
    popup.classList.add('popup_is-opened');
} 

export function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

export function setupPopupClose(popup) {
    //const page = document.querySelector('.page__content');
    const closeButton = popup.querySelector('.popup__close');

    closeButton.addEventListener('click', () => closeModal(popup));
    document.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup_is-opened')){
            closeModal(popup);
        }
    });
    document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {
            closeModal(popup);
        }
    });
}

const allPopups = document.querySelectorAll('.popup');
allPopups.forEach(popup => {
    popup.classList.add('popup_is-animated');
});