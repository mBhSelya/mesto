export default class UserInfo {
    constructor({ nickname, description, avatar, userId}) {
        this._nickname = document.querySelector(nickname);
        this._description = document.querySelector(description);
        this._avatar = document.querySelector(avatar);
        this._userId = userId;
    }

    getUserInfo() {
        const profileObj = {
            name: this._nickname.textContent,
            description: this._description.textContent
        }
        return profileObj;
    }

    setUserInfo(info) {
        this._nickname.textContent = info.name;
        this._description.textContent = info.about;
        this._avatar.src = info.avatar;
        this._userId = info._id;
    }
}