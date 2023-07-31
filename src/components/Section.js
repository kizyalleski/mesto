export default class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    // перебирает массив _initialArray и вызывает для каждого элемента метод addItem()
    this._initialArray.slice().reverse().forEach((item) => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement);
    });
  }

  addItem(element) {
    // принимает элемент и вставляет его в документ методом append
    this._container.prepend(element);
  }
}
