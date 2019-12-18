// Global App controller
import "../scss/main.scss";
import Search from "./modules/Search";
import { DOM, renderLoader, clearLoader } from "./views/dom-obj";
import * as searchView from "./views/search-view";

// Global state of app
//  - Search object
//  - Current recipe object
//  - Shopping list object
//  - Liked recipes
const state = {};

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
    searchView.renderResults(state.search.recipes, goToPage);
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
    // render loader while fetching
    renderLoader(DOM.resultPanel);

    // search for recipe
    await state.search.getRes(); // Promise is returned

    // Render results on UI
    clearLoader();
    searchView.renderResults(state.search.recipes);
  }
};
