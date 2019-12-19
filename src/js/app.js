// Global App controller
import "../scss/main.scss";
import Search from "./modules/Search";
import Recipe from "./modules/Recipe";
import ShoppingList from "./modules/ShoppingList";
import { DOM, renderLoader, clearLoader } from "./views/dom-obj";
import * as searchView from "./views/search-view";
import * as recipeView from "./views/rec-view";
import * as listView from "./views/list-view";

// Global state of app
//  - Search object
//  - Current recipe object
//  - Shopping list object
//  - Liked recipes
const state = {};

/** Search Controller */

// Search form
DOM.searchForm.addEventListener("submit", e => {
  e.preventDefault(); // Prevent reloading page on click
  controlSearch();
});

// Handle pagination on button click
DOM.resultPageBtns.addEventListener("click", e => {
  // Targeting each btn only
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    // Render next page
    searchView.clearPrevSearch();
    searchView.renderResults(state.search.results, goToPage);
  }
});

const controlSearch = async () => {
  // get query from view
  const query = searchView.getInput();
  //   console.log(query);///

  if (query) {
    // add new search object to state
    state.search = new Search(query);

    // prepare UI for results
    searchView.clearPrevSearch();
    searchView.clearInput();
    renderLoader(DOM.resultPanel);
    try {
      // search for recipe
      await state.search.getRes(); // Promise is returned

      // Render results on UI
      clearLoader();
      searchView.renderResults(state.search.results);
    } catch (e) {
      alert("Something when wrong in search");
      clearLoader();
    }
  }
};

/** Recipe Controller */

const controlRecipe = async () => {
  // Get id from url
  const id = window.location.hash.replace("#", "");

  if (id) {
    // create a new recipe obj
    state.recipe = new Recipe(id);
    // prepare UI for results
    recipeView.clearPrevSearch();
    renderLoader(DOM.recipePanel);
    // highlight selected
    if (state.search) searchView.highlightSelected(id);
    try {
      // get data & parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServing();

      // render results on UI
      clearLoader();
      //   console.log(state.recipe); ///

      recipeView.renderRecipe(state.recipe);
    } catch (e) {
      console.log(e);
      alert("Error processing recipe");
      clearLoader();
    }
  }
};

/** Shopping List Controller */
const controlList = () => {
  // create a new list if there isn't one
  if (!state.list) {
    state.list = new ShoppingList();
  }
  // add all ingredients
  state.recipe.ingredients.forEach(e => {
    const item = state.list.addItem(e.count, e.unit, e.ingred);
    listView.renderItem(item);
  });
};

// Get ID from URL
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe); // fired when page is loaded
// Using above listeners
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe));

// Handle recipe serving btns
DOM.recipePanel.addEventListener("click", e => {
  // * to denote anything that's child of btn
  if (e.target.matches(".btn-minus, .btn-minus *")) {
    // When minus btn is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-plus, .btn-plus *")) {
    // When plus btn is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingIngredients(state.recipe);
  } else if (e.target.matches(".btn-cart, .btn-cart *")) {
    // Adding the ingredients to shopping cart
    controlList();
  }
});

// Handle delete shopping item
DOM.shoppingList.addEventListener("click", e => {
  const id = e.target.closest(".shopping-list-item").dataset.itemid;

  // handle delete btn
  if (e.target.matches(".btn-delete, .btn-delete *")) {
    // remove from state
    state.list.removeItem(id);
    // remove from UI
    listView.deleteItem(id);
  }
  // Handle count update
  else if (e.target.matches(".shopping-list-item-count input")) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCnt(id, val);
  }
});
