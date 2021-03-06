const DOMStr = {
  loader: "loader"
};

export const DOM = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search-field"),
  searchList: document.querySelector(".result-list"),
  resultPanel: document.querySelector(".result-panel"),
  resultPageBtns: document.querySelector(".result-page-btns"),
  resultPageBtnsPrev: document.querySelector(".result-page-btns-prev"),
  resultPageBtnsNext: document.querySelector(".result-page-btns-next"),
  recipePanel: document.querySelector(".recipe-panel"),
  shoppingList: document.querySelector(".shopping-list"),
  likeList: document.querySelector('.likes-list')
  // Doesn't get loaded right away
  // heartIconNav: document.querySelector('#main-nav .fa-heart'),
  // heartIconRec: document.querySelector('.recipe-details .fa-heart'),
  // likeBtnNav: document.querySelectorAll('.likes-field i')
};

export const renderLoader = parent => {
  const loader = `
    <div class="${DOMStr.loader}">
      <i class="fas fa-spinner fa-2x"></i>
    </div>
    `;

  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector("." + DOMStr.loader);
  if (loader) loader.parentElement.removeChild(loader);
};
