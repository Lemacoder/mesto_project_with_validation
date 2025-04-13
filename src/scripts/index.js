import { initialCards } from './cards.js';

const placesList = document.getElementById('placesList');
const cardTemplate = document.getElementById('card-template').content;

// Попап просмотра изображения
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Функция открытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Закрытие попапа по нажатию Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// Функция создания карточки
function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;

  // Открытие попапа с изображением
  image.addEventListener('click', () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openModal(imagePopup);
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', (event) => {
    const cardItem = event.target.closest('.card');
    if (cardItem) {
      cardItem.remove();
    }
  });

  return cardElement;
}

// Функция отображения карточек
function renderCards() {
  placesList.innerHTML = '';
  initialCards.forEach(card => {
    const cardElement = createCard(card);
    placesList.appendChild(cardElement);
  });
}

// Закрытие попапа при нажатии на кнопку закрытия изображения
imagePopupCloseButton.addEventListener('click', () => {
  closeModal(imagePopup);
});

// Получаем элементы для попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const closeEditButton = editPopup.querySelector('.popup__close');
const editForm = editPopup.querySelector('.popup__form');

// Открытие попапа редактирования при нажатии на кнопку
editButton.addEventListener('click', () => {
  const name = document.querySelector('.profile__title').textContent;
  const description = document.querySelector('.profile__description').textContent;

  editForm.querySelector('#name-input').value = name;
  editForm.querySelector('#description-input').value = description;

  openModal(editPopup);
});

// Закрытие попапа редактирования при нажатии на кнопку закрытия
closeEditButton.addEventListener('click', () => {
  closeModal(editPopup);
});

// Обработчик отправки формы редактирования профиля
editForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = editForm.querySelector('#name-input');
  const descriptionInput = editForm.querySelector('#description-input');

  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = descriptionInput.value;

  closeModal(editPopup);
});

// Получаем элементы для попапа добавления карточки
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closeNewCardButton = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('.popup__form');

// Открытие попапа добавления карточки при нажатии на кнопку
addButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

// Закрытие попапа при нажатии на кнопку закрытия добавления карточки
closeNewCardButton.addEventListener('click', () => {
  closeModal(newCardPopup);
});

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
  const linkInput = newCardForm.querySelector('input[name="link"]');

  const newCard = { name: placeNameInput.value, link: linkInput.value };
  initialCards.unshift(newCard);
  renderCards();
  closeModal(newCardPopup);
  newCardForm.reset();
});

// Закрытие попапов по клику на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Валидация форм
function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const buttonElement = form.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(form, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  enableValidation();
});
