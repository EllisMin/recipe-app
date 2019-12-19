// Global App controller
import "../scss/main.scss";
import Search from "./modules/Search";
import Recipe from "./modules/Recipe";
import ShoppingList from "./modules/ShoppingList";
import Likes from "./modules/Likes";
import { DOM, renderLoader, clearLoader } from "./views/dom-obj";
import * as searchView from "./views/search-view";
import * as recipeView from "./views/rec-view";
import * as listView from "./views/list-view";
import * as likesView from "./views/likes-view";

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
      // Render with pagination on desktop
      if (!usingTablet) searchView.renderResults(state.search.results);
      else searchView.renderResultsWithoutPage(state.search.results);
    } catch (e) {
      // alert("Something when wrong in search");
      alert(e);
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
      // console.log(state.recipe); ///

      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
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
  state.recipe.ingredients.forEach(rec => {
    // When the same ingredient already exists in the list
    const dupEntry = state.list.dupCheckUpdate(rec);
    // When duplicate exists
    if (dupEntry !== -1) {
      // Update count of existing UI
      listView.updateEntry(dupEntry);
    } else {
      const item = state.list.addItem(rec.count, rec.unit, rec.ingred);
      listView.renderItem(item);
    }
  });
};

/** Like Controller  */
const controlLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }
  const curId = state.recipe.id;

  // User hasn't like the current recipe yet
  if (!state.likes.isLiked(curId)) {
    // add like to state
    const newLike = state.likes.addLike(
      curId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.imgUrl
    );
    // toggle the like btn
    likesView.toggleLikeBtn(true);

    // add like to UI list
    likesView.renderLike(newLike);
  } else {
    // remove like to state
    state.likes.removeLike(curId);
    // toggle the like btn
    likesView.toggleLikeBtn(false);

    // remove like to UI list
    likesView.deleteLike(curId);
  }
  // Toggle heart button in navbar
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load
window.addEventListener("load", () => {
  state.likes = new Likes();
  // Restore likes
  state.likes.readStorage();
  // Toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  // Render the existing likes
  state.likes.likes.forEach(like => {
    likesView.renderLike(like);
  });
});

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
  } else if (e.target.matches(".btn-heart, .btn-heart *")) {
    // Like controller
    controlLike();
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

// Media query
let tablet = window.matchMedia("(max-width: 800px)");
usingTabletFcn(); // Call listener function at run time
tablet.addListener(usingTabletFcn); // Attach listener function on state change
let usingTablet = tablet.matches;

function usingTabletFcn() {
//   console.log(usingTablet);
  if (tablet.matches) {
    // handle search results; when using tablet, it removes pagination
    if (state.search) controlSearch();
    usingTablet = true;
  } else {
    if (state.search) controlSearch();
    usingTablet = false;
  }
}
