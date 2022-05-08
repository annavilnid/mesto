export default class Api {
  constructor(config) {
    this._url = config.url
    this._headers = config.headers
  }

  getCardsApi() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponseApi)
  }


  getUserInfoApi() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponseApi)
  }

  _checkResponseApi(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }


  getDataApi() {
    return Promise.all([this.getCardsApi(), this.getUserInfoApi()])
  }

  setUserInfoApi(userData) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkResponseApi)
  }

  addNewCardApi(cardData) {
    return fetch(this._url + '/cards', {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        }),
      })
      .then(this._checkResponseApi)
  }

  deliteCardApi(id) {
    return fetch(this._url + `/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponseApi)
  }

  likeApi(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  dislikeApi(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

}

/*
  getUserApi() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return res.json();
    })
  }

  getCardsApi() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkResponseApi)
  }

  getDataApi() {
    return Promise.all([this.getCardsApi(), this.getUserApi()])
  }



  setUserInfoApi(userData) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.userName,
        about: userData.userInfo
      })
    })
    .then(this._checkResponseApi)
  }

  addCardApi() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkResponseApi)
  }

}
*/
