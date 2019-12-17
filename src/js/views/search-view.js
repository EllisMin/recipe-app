import { DOM } from "./dom-obj";
const titleLimit = 15;

const renderRecipe = recipe => {
  const markup = `
  <li>
    <a href="#${recipe.id}" class="result-link">
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
const limitRecipeTitle = (recipeTitle, limit = titleLimit) => {
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

export const getInput = () => DOM.searchInput.value;

export const renderResults = recipes => {
  //   recipes.forEach(element => {
  //     renderRecipe(element);
  //   });
  // Same as above
  recipes.forEach(renderRecipe);
};

export const clearInput = () => {
  DOM.searchInput.value = "";
};
export const clearPrevSearch = () => {
  DOM.searchList.innerHTML = "";
};
