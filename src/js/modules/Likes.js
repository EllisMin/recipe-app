export default class Likes {
  constructor() {
    this.likes = [];
  }
  addLike(id, title, author, imgUrl) {
    const like = { id, title, author, imgUrl };
    this.likes.push(like);
    return like;
  }

  removeLike(id) {
    const i = this.likes.findIndex(e => e.id === id);
    this.likes.splice(i, 1);
  }

  isLiked(id) {
    return this.likes.findIndex(e => e.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }
}
