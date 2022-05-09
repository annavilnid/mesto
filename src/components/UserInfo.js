export default class UserInfo {
  constructor({name, info, avatar}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
    this._avatar = document.querySelector(avatar);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    this._userData = {
        name: this._name.textContent,
        about: this._info.textContent,
    }

    return this._userData;
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._info.textContent = userData.about;
  }

  //изменяет данные пользователя
  setUserAvatar(userData) {
    this._avatar.src = userData.avatar;
  }
}
