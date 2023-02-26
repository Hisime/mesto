export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements () {
    this._items.forEach((item) => {
      this.addItem(item, false);
    })
  }

  addItem (item, prepend) {
    const element = this._renderer(item)
    prepend ? this._container.prepend(element) : this._container.append(element);
  }
}
