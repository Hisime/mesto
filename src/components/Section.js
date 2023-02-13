export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.renderElements();
  }

  renderElements () {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item), false);
    })
  }

  addItem (element, prepend) {
    prepend ? this._container.prepend(element) : this._container.append(element);
  }
}
