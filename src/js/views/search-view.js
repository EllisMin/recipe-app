import { DOM } from "./dom-obj";
const titleLimit = 15;
const searchPerPage = 10;
const renderRecipe = recipe => {
  const markup = `
  <li>
    <a href="#${recipe.recipe_id}" class="result-link">
      <div class="result-fig">
        <img src="${recipe.image_url}" alt="${recipe.title}" />
      </div>
      <div class="result-data">
        <h4 class="result-name">${limitRecipeTitle(recipe.title)}</h4>
        <p class="result-author">${recipe.publisher}</p>
      </div>
    </a>
  </li>`;
  DOM.searchList.insertAdjacentHTML("beforeend", markup);
};

// Shorten the title when exceeding the limit
/**
 * Example: 'Pasta with tomato and spinach'
 *   acc: 0 / acc + cur.length = 5, newTitle = ['Pasta']
 *   acc: 5 / acc + cur.length = 9, newTitle = ['Pasta', 'with']
 *   acc: 9 / acc + cur.length = 15, newTitle = ['Pasta', 'with', 'tomato']
 *   acc: 15 / acc + cur.length = 18, newTitle = ['Pasta', 'with', 'tomato']
 *   acc: 18 / acc + cur.length = 24, newTitle = ['Pasta', 'with', 'tomato']
 */
export const limitRecipeTitle = (recipeTitle, limit = titleLimit) => {
  const newTitle = [];
  if (recipeTitle.length > limit) {
    recipeTitle.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")} ...`;
  }
  return recipeTitle;
};

const createBtn = (page, type) => {
  let markup;
  if (type === "prev") {
    markup = `
        <button class="btn btn-inline btn-prev" data-goto="${page - 1}">
          <span><i class="fas fa-caret-left"></i>Page ${page - 1}</span>
        </button>`;
    DOM.resultPageBtnsPrev.insertAdjacentHTML("beforeend", markup);
  } else if (type === "next") {
    markup = `
    <button class="btn btn-inline btn-next" data-goto="${page + 1}">
    <span>Page ${page + 1}<i class="fas fa-caret-right"></i></span>
    </button>`;
    DOM.resultPageBtnsNext.insertAdjacentHTML("beforeend", markup);
  } else {
    throw new Error("Type must be either prev or next");
  }
  //   return markup;
};

const renderBtns = (page, numEntry, resPerPage) => {
  const pages = Math.ceil(numEntry / resPerPage);

  if (page === 1 && pages > 1) {
    // render next page btn
    createBtn(page, "next");
  } else if (page < pages) {
    // render both prev, next btns
    createBtn(page, "prev");
    createBtn(page, "next");
  } else if (page === pages) {
    // render prev btn at the last page
    createBtn(page, "prev");
  }
};

export const getInput = () => DOM.searchInput.value;
export const clearInput = () => {
  DOM.searchInput.value = "";
};

export const clearPrevSearch = () => {
  DOM.searchList.innerHTML = "";
  DOM.resultPageBtnsPrev.innerHTML = "";
  DOM.resultPageBtnsNext.innerHTML = "";
};

export const renderResults = (
  recipes,
  page = 1,
  resPerPage = searchPerPage
) => {
  // Render entries
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  //   recipes.forEach(element => {
  //     renderRecipe(element);
  //   });
  // === recipes.forEach(renderRecipe);

  // Render buttons for pagination
  renderBtns(page, recipes.length, resPerPage);
};

export const renderResultsWithoutPage = (recipes) => {
  recipes.forEach(renderRecipe);
};

export const highlightSelected = id => {
  // Remove selected
  const arrRes = Array.from(document.querySelectorAll(".active"));
  arrRes.forEach(e => {
    e.classList.remove("active");
  });
  // Using css selecting
  document.querySelector(`.result-link[href="#${id}"]`).classList.add("active");
};
