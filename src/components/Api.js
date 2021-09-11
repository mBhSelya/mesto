export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInfoUser() {
        return fetch(`${this._baseUrl}users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    sendUserInfo({name, about}) {
         return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              about: about
            })
        })
        .then(this._checkResponse)
    }

    postNewCard({name, link}) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse)
    }



    deleteCard(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    setLikeCard(id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    deleteLikeCard(id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    editAvatar({link}) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
        .then(this._checkResponse)
    }
}