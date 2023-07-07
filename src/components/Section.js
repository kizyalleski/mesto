export default class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    // перебирает массив _initialArray и вызывает для каждого элемента метод addItem()
    this._initialArray.forEach( item => {
      this.addItem(item);
    });
  }

  addItem(element) {
    // принимает элемент и вставляет его в документ методом append
    this._container.append(element);
  }
}
