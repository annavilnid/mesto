export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //добавляет в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  //перебирает карточки
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item)
    })
  }
}
