const DOMStr = {
  loader: "loader"
};

export const DOM = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search-field"),
  searchList: document.querySelector(".result-list"),
  resultPanel: document.querySelector(".result-panel")
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
