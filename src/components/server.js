import { placesList } from './index';
import { createCard } from './card.js';

let user_id = null;

// Получение данных пользователя
export function serverUser() {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
    headers: {
      authorization: 'c6f39b35-acde-4bea-9a76-beb0de6a82d6'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка загрузки пользователя: ${res.status}`);
    }
    return res.json();
  })
  .then(result => {
    document.querySelector('.profile__image').style.backgroundImage = `url(${result.avatar})`;
    document.querySelector('.profile__title').textContent = result.name;
    document.querySelector('.profile__description').textContent = result.about;
    user_id = result._id;
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных пользователя:', err);
  });
}

// Получение карточек
export function serverCards() {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
    headers: {
      authorization: 'c6f39b35-acde-4bea-9a76-beb0de6a82d6'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка загрузки карточек: ${res.status}`);
    }
    return res.json();
  })
  .then(result => {
    placesList.innerHTML = ''; // Очистить список перед добавлением
    for (let i = 0; i < result.length; i++) {
      const isOwner = result[i].owner._id === user_id;
      placesList.append(createCard(
        result[i].name,
        result[i].link,
        result[i].likes.length,
        isOwner,
        result[i]._id
      ));
    }
  })
  .catch(err => {
    console.error('Ошибка при загрузке карточек:', err);
  });
}

// Обновление данных пользователя
export function updateUser(Name, Description) {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'c6f39b35-acde-4bea-9a76-beb0de6a82d6',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: Name,
      about: Description
    })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка обновления пользователя: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при обновлении данных пользователя:', err);
  });
}

// Добавление новой карточки
export function appendCard(CardName, TypeUrl) {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
    method: 'POST',
    headers: {
      authorization: 'c6f39b35-acde-4bea-9a76-beb0de6a82d6',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: CardName,
      link: TypeUrl
    })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка добавления карточки: ${res.status}`);
    }
    return res.json();
  })
  .then(data => data._id)
  .catch(err => {
    console.error('Ошибка при добавлении карточки:', err);
  });
}

// Удаление карточки
export function deleteCard(cardId) {
  const request = `https://nomoreparties.co/v1/apf-cohort-202/cards/${cardId}`;
  return fetch(request, {
    method: 'DELETE',
    headers: {
      authorization: 'c6f39b35-acde-4bea-9a76-beb0de6a82d6',
    },
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка удаления карточки: ${res.status}`);
    }
  })
  .catch(err => {
    console.error('Ошибка при удалении карточки:', err);
  });
}

// Добавление лайка
export function addLike(cardId) {
  const request = `https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`;
  return fetch(request, {
    method: 'PUT',
    headers: {
      authorization: 'c6f39b35-acde-4bea-9a76-beb0de6a82d6',
    },
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка добавления лайка: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при добавлении лайка:', err);
  });
}

// Удаление лайка
export function deleteLike(cardId) {
  const request = `https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`;
  return fetch(request, {
    method: 'DELETE',
    headers: {
      authorization: 'c6f39b35-acde-4bea-9a76-beb0de6a82d6',
    },
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка удаления лайка: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при удалении лайка:', err);
  });
}
