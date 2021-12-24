export default class CommentsCounter {
  constructor(comments) {
    this.comments = comments;
  }

  getLength() {
    return this.comments.length;
  }
}