export default class UserInfo {
    constructor({ nickname, description }) {
        this._nickname = document.querySelector(nickname);
        this._description = document.querySelector(description);
    }

    getUserInfo() {
        const profileObj = {
            name: this._nickname.textContent,
            description: this._description.textContent
        }
        return profileObj;
    }

    setUserInfo({nickname, description}) {
        this._nickname.textContent = nickname;
        this._description.textContent = description;
    }
}