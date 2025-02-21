import { initialCards } from './cards.js'; // Убедитесь, что путь правильный

const placesList = document.getElementById('placesList');
const cardTemplate = document.getElementById('card-template').content;

// Получаем элементы попапа для просмотра изображения
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Функция для открытия попапа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

// Функция для закрытия попапа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

// Функция для отображения карточек
function renderCards() {
    console.log("Создание карточки"); 
    initialCards.forEach(card => {
        const cardElement = cardTemplate.cloneNode(true);
        const image = cardElement.querySelector('.card__image');
        const title = cardElement.querySelector('.card__title');
        const likeButton = cardElement.querySelector('.card__like-button');
        const deleteButton = cardElement.querySelector('.card__delete-button');

        image.src = card.link; 
        image.alt = card.name;  
        title.textContent = card.name; 

        // Обработчик клика по изображению для открытия попапа
        image.addEventListener('click', () => {
            popupImage.src = card.link; // Заполняем атрибуты попапа
            popupImage.alt = card.name;
            popupCaption.textContent = card.name;
            openModal(imagePopup); // Открываем попап с изображением
        });

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('card__like-button_is-active'); // Добавляем/убираем класс для лайка
        });

        deleteButton.addEventListener('click', (event) => {
            const cardItem = event.target.closest('.card'); // Ищем родительский элемент карточки
            if (cardItem) {
                cardItem.remove(); // Удаляем родительский элемент (карточку)
            }
        });

        placesList.appendChild(cardElement); 
    });
}

// Закрытие попапа при нажатии на кнопку закрытия изображения
imagePopupCloseButton.addEventListener('click', () => {
    closeModal(imagePopup); // Скрываем попап с изображением
});

// При загрузке страницы отображаем карточки
document.addEventListener('DOMContentLoaded', () => {
    renderCards(); 
});

// Получаем элементы для попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-button'); // Кнопка для открытия попапа редактирования
const editPopup = document.querySelector('.popup_type_edit'); // Сам попап редактирования
const closeEditButton = editPopup.querySelector('.popup__close'); // Кнопка для закрытия попапа редактирования
const editForm = editPopup.querySelector('.popup__form'); // Форма внутри попапа редактирования

// Открытие попапа редактирования при нажатии на кнопку
editButton.addEventListener('click', () => {
  const name = document.querySelector('.profile__title').textContent;
  const description = document.querySelector('.profile__description').textContent;

  editPopup.querySelector('input[name="name"]').value = name;
  editPopup.querySelector('input[name="description"]').value = description;

  openModal(editPopup); // Открываем попап редактирования
});

// Закрытие попапа редактирования при нажатии на кнопку закрытия
closeEditButton.addEventListener('click', () => {
  closeModal(editPopup); // Скрываем попап редактирования
});

// Закрытие попапа редактирования при отправке формы
editForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newName = editForm.querySelector('input[name="name"]').value;
  const newDescription = editForm.querySelector('input[name="description"]').value;

  document.querySelector('.profile__title').textContent = newName;
  document.querySelector('.profile__description').textContent = newDescription;

  closeModal(editPopup); // Закрываем попап редактирования после сохранения изменений
});

// Получаем элементы для попапа добавления карточки
const addButton = document.querySelector('.profile__add-button'); // Кнопка для открытия попапа добавления карточки
const newCardPopup = document.querySelector('.popup_type_new-card'); // Попап для добавления карточки
const closeNewCardButton = newCardPopup.querySelector('.popup__close'); // Кнопка закрытия попапа добавления карточки
const newCardForm = newCardPopup.querySelector('.popup__form'); // Форма внутри попапа добавления карточки

// Открытие попапа добавления карточки при нажатии на кнопку
addButton.addEventListener('click', () => {
    openModal(newCardPopup); // Открываем попап добавления карточки
});

// Закрытие попапа при нажатии на кнопку закрытия добавления карточки
closeNewCardButton.addEventListener('click', () => {
    closeModal(newCardPopup); // Скрываем попап добавления карточки
});

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Отменяем стандартную отправку формы

    const placeName = newCardForm.querySelector('input[name="place-name"]').value;
    const link = newCardForm.querySelector('input[name="link"]').value;

    const newCard = { name: placeName, link: link };

    initialCards.push(newCard); // Добавляем новую карточку в массив initialCards

    renderCards(); // Перерисовываем карточки, чтобы отобразить новую

    closeModal(newCardPopup); // Закрываем попап после сохранения изменений

    newCardForm.reset(); // Сбрасываем поля формы (опционально)
});