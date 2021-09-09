export default class Api {

    getInfoUser() {
        return fetch('https://nomoreparties.co/v1/cohort-27/users/me ', {
            headers: {
                authorization: '2808c73a-a30b-458f-af2d-b76704edccd0'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
            headers: {
                authorization: '2808c73a-a30b-458f-af2d-b76704edccd0'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    sendUserInfo({name, about}) {
         return fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me', {
            method: 'PATCH',
            headers: {
              authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    postNewCard({name, link}) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
            method: 'POST',
            headers: {
                authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }



    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setLikeCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteLikeCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    editAvatar({link}) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link,
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}