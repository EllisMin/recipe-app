import { DOM } from "./dom-obj";
import { Fraction } from "fractional";

const createIngredient = ingred => `
<li class="item-ingredient">
  <i class="far fa-check-circle"></i>
  <div class="ingredient-count">${formatCount(ingred.count)}</div>
  <div class="ingredient-which">
    <span class="ingredient-unit">${ingred.unit}</span>
    ${ingred.ingred}
  </div>
</li>
`;

const formatCount = count => {
  if (count) {
    // Ex: count = 2.5 --> 5/2 --> 2 1/2
    // Ex: count = 0.5 --> 1/2
    const [int, dec] = count
      .toString()
      .split(".")
      .map(e => parseInt(e, 10));

    if (!dec) {
      return count;
    }
    if (int === 0) {
      const fraction = new Fraction(count);
      return `${fraction.numerator}/${fraction.denominator}`;
    } else {
      const fraction = new Fraction(count - int);
      return `${int} ${fraction.numerator}/${fraction.denominator}`;
    }
  }
  return "?";
};

export const renderRecipe = rec => {
  const markup = `
  <!-- Figure -->
  <div class="recipe-fig">
    <div class="recipe-img" style="background: url('${rec.imgUrl}');"></div>
    <h1 class="recipe-title">
      <span>${rec.title}</span>
    </h1>
  </div>
  <div class="recipe-details">
    <!-- Minutes -->
    <div class="recipe-info">
      <i class="fas fa-hourglass-end"></i>
      <!-- <i class="far fa-hourglass"></i> -->
      <span class="recipe-info-minutes">${rec.time}</span>
      <span class="recipe-info-text">minutes</span>
    </div>
    <!-- Servings -->
    <div class="recipe-info-servings">
      <i class="fas fa-male"></i>
      <span class="recipe-info-serving">${rec.servings}</span>
      <span class="recipe-info-text">servings</span>
      <!-- + and - btns -->
      <div class="recipe-info-btns">
        <button class="btn btn-minus">
          <i class="fas fa-minus-square fa-lg"></i>
        </button>
        <button class="btn btn-plus">
          <i class="fas fa-plus-square fa-lg"></i>
        </button>
      </div>
    </div>
    <!-- heart btn -->
    <button class="btn btn-heart fa-lg">
      <i class="fas fa-heart"></i>
    </button>
  </div>
  <div class="recipe-ingredients">
    <ul class="recipe-ingredients-list">
        ${rec.ingredients.map(e => createIngredient(e)).join("")}
    </ul>
    <!-- Add to shopping list btn -->
    <button class="btn btn-recipe">
      <i class="fas fa-shopping-cart fa-xs"></i>
      <span>Add to shopping list</span>
    </button>
  </div>
  
  <div class="recipe-directions">
    <h2 class="title-2">How to cook it</h2>
    <p class="recipe-directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe-by">${rec.author}</span>. Please check out
      more detailed directions at their website.
    </p>
    <a
      class="btn btn-recipe"
      href="${rec.srcUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <i class="fas fa-caret-right"></i>
    </a>
  </div>`;
  DOM.recipePanel.insertAdjacentHTML("beforeend", markup);
};

export const clearPrevSearch = () => {
  DOM.recipePanel.innerHTML = "";
};

export const updateServingIngredients = rec => {
  // update count
  document.querySelector(".recipe-info-serving").innerHTML = rec.servings;
  // update ingredients
  const elementCnt = Array.from(document.querySelectorAll(".ingredient-count"));
  elementCnt.forEach((e, i) => {
    e.innerHTML = formatCount(rec.ingredients[i].count);
  });
};
