import CommentsCounter from '../_mock_/commentsCounter.js';

describe('Check Items count number', () => {
  test('return the length of array', () => {
    const comments = ['comment1', 'comment2', 'comment3', 'comment4', 'comment5', 'comment6', 'comment7', 'comment8'];

    const commentCounter = new CommentsCounter(comments);
    expect(commentCounter.getLength()).toEqual(8);
  });
});