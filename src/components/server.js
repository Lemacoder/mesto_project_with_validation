import { placesList } from './index';
import { createCard } from './card.js';

let user_id = null;

export function serverUser() {
    fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
        headers: {
          authorization: '1de85579-7d0e-4533-a5e4-59dce429e385'
        }
      })
        .then(res => res.json())
        .then((result) => {
            document.querySelector('.profile__image').style.backgroundImage = result.avatar;
            document.querySelector('.profile__title').textContent = result.name;
            document.querySelector('.profile__description').textContent = result.about;
            user_id = result._id;
    });
}

export function serverCards() {
    fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
        headers: {
          authorization: '1de85579-7d0e-4533-a5e4-59dce429e385'
        }
      })
        .then(res => res.json())
        .then((result) => {
            for (let i=0; i < result.length; i++) {
              if (result[i].owner._id !== user_id) {
                placesList.append(createCard(result[i].name, result[i].link, result[i].likes.length, false, result[i]._id));
              } else {
                placesList.append(createCard(result[i].name, result[i].link, result[i].likes.length, true, result[i]._id));
              }
            }
    });
}

export function updateUser(Name, Description) {
  fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '1de85579-7d0e-4533-a5e4-59dce429e385',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: Name,
      about: Description
    })
  }); 
}

export function appendCard(CardName, TypeUrl) {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
    method: 'POST',
    headers: {
      authorization: '1de85579-7d0e-4533-a5e4-59dce429e385',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: CardName,
      link: TypeUrl
    })
  })
  .then(res => {
    return res.json();
  })
  .then(data => {
    return data._id;
  });
}

export function deleteCard (cardId) {
  const requst = 'https://nomoreparties.co/v1/apf-cohort-202/cards/' + cardId;
  fetch(requst, {
    method: 'DELETE',
    headers: {
      authorization: '1de85579-7d0e-4533-a5e4-59dce429e385',
    },
  });
}

export function addLike (cardId) {
  const requst = 'https://nomoreparties.co/v1/apf-cohort-202/cards/likes/' + cardId;
  fetch(requst, {
    method: 'PUT',
    headers: {
      authorization: '1de85579-7d0e-4533-a5e4-59dce429e385',
    },
  });

  
}

export function deleteLike (cardId) {
  const requst = 'https://nomoreparties.co/v1/apf-cohort-202/cards/likes/' + cardId;
  fetch(requst, {
    method: 'DELETE',
    headers: {
      authorization: '1de85579-7d0e-4533-a5e4-59dce429e385',
    },
  });
}