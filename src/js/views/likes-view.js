import { DOM } from "./dom-obj";
import { limitRecipeTitle } from "./search-view";

const renderNoItemMessage = () => {
  const markup = `
  <li class="no-item">
    <div class="likes-data">
      <h4 class="no-item-title">There's no liked item ( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )</h4>
    </div>
  </li>`;

  DOM.likeList.insertAdjacentHTML("afterbegin", markup);
};
export const toggleLikeBtn = isLiked => {
  const heartIconRec = document.querySelector(".recipe-details .fa-heart");

  if (isLiked) {
    heartIconRec.classList.add("primary-color-dark");
  } else {
    heartIconRec.classList.remove("primary-color-dark");
  }
};

export const toggleLikeMenu = numLikes => {
  const likeIconNav = document.querySelector(".likes-field i");
  if (numLikes > 0) {
    likeIconNav.style.opacity = 1;
    const noItemMsg = document.querySelector("li.no-item");
    if (noItemMsg) {
      noItemMsg.parentElement.removeChild(noItemMsg);
    }
  } else {
    likeIconNav.style.opacity = 0.2;
    if (!document.querySelector("li.no-item")) {
      renderNoItemMessage();
    }
  }
};

export const renderLike = like => {
  const markup = `
    <li>
      <a href="#${like.id}" class="likes-link">
      <div class="likes-fig">
        <img src="${like.imgUrl}" alt="${like.title}" />
      </div>
      <div class="likes-data">
        <h4 class="likes-name">${limitRecipeTitle(like.title)}</h4>
        <p class="likes-author">${like.author}</p>
      </div>
    </a>
  </li>`;
  DOM.likeList.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = id => {
  const e = document.querySelector(`.likes-link[href*="${id}"]`).parentElement;
  if (e) {
    e.parentElement.removeChild(e);
  }
};
