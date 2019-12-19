import uniqid from "uniqid";

export default class ShoppingList {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  removeItem(id) {
    const index = this.items.findIndex(e => e.id === id);
    // start index, how many positions after
    // splice: [2, 4, 6] splice(1, 2) --> returns [4, 6]. Original: [2]
    // slice : [2, 4, 6] splice(1, 2) --> returns 4. Original: [2, 4, 8]
    const toBeRemoved = this.items[index];
    this.items.splice(index, 1); // remove one element at index
    return toBeRemoved;
  }

  updateCnt(id, newCnt) {
    // find() returns the element itself
    this.items.find(e => e.id === id).count = newCnt;
  }
}
