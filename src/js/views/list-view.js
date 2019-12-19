import { DOM } from "./dom-obj";

export const renderItem = item => {
  const markup = `
    <li class="shopping-list-item" data-itemid=${item.id}>
    <div class="shopping-list-item-count">
      <input type="number" value="${item.count}" step="${item.count}" />
      <p class="shopping-list-item-unit">${item.unit}</p>
    </div>
    <p class="shopping-list-item-des">${item.ingredient}</p>
    <button class="btn btn-delete">
      <i class="fas fa-minus-circle"></i>
    </button>
  </li>
    `;
  DOM.shoppingList.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = id => {
  const item = document.querySelector(`li[data-itemid="${id}"]`);

  if (item) {
    // Fade out animation
    item.classList.add("entry-disappear");
    setTimeout(function() {
      item.parentElement.removeChild(item);
    }, 300);
  }
};

// Update the entry when trying to add duplicate ingredient to the list
export const updateEntry = existingEntry => {
  const item = document.querySelector(
    `li[data-itemid="${existingEntry.id}"] > div > input`
  );
  item.value = existingEntry.count;
};
