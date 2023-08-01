export default class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    // перебирает массив _initialArray и вызывает для каждого элемента метод addItem()
    items.slice().reverse().forEach((item) => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement);
    });
  }

  addItem(element) {
    // принимает элемент и вставляет его в документ методом append
    this._container.prepend(element);
  }
}
