export default class ItemsCounter {
  constructor(items) {
    this.items = items;
  }

  getLength() {
    return this.items.length;
  }
}