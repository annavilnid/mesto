export default class UserInfo {
  constructor(name, info) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    this._userData = {
        userName: this._name.textContent,
        userInfo: this._info.textContent
    }
    return this._userData;
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({userName, userInfo}) {
    this._name.textContent = userName;
    this._info.textContent = userInfo;
  }
}
