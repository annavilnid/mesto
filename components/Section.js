export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //добавляет в контейнер
  addItem(cardData) {
    const cardElement = this._renderer(cardData);
    this._container.prepend(cardElement);
  }

  //перебирает карточки, добавляет в контейнер
  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
}
