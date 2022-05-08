export default class Section {
  constructor(renderer, containerSelector) {
    //this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //добавляет в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  //перебирает карточки
  renderItems(cardData) {
    this._renderedItems = cardData,
    this._renderedItems.forEach(item => {
    this._renderer(item)
    });
  }
}




