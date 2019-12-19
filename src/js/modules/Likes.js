export default class Likes {
  constructor() {
    this.likes = [];
  }
  addLike(id, title, author, imgUrl) {
    const like = { id, title, author, imgUrl };
    this.likes.push(like);

    // Persist data in localStorage
    this.persistData();

    return like;
  }

  removeLike(id) {
    const i = this.likes.findIndex(e => e.id === id);
    this.likes.splice(i, 1);
    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex(e => e.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem("likes"));
    // Restore likes from the localStorage
    if (storage) {
      this.likes = storage;
    }
  }
}
