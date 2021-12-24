import commentsCounter from '../_mock_/commentsCounter.js';

describe('Check Items count number', () => {
  test('check if the function actually does the count', async () => {
    const data = await commentsCounter(52795);
    const count = data.length;
    expect(count).toEqual(5);
  });

  test(' check if the function has length', async () => {
    const data = await commentsCounter(52795);
    const count = data.length;
    expect(count === data.length).toBe(true);
  });

  test('check if the length is of number type', async () => {
    const data = await commentsCounter(52795);
    const count = data.length;
    expect(typeof count).toEqual('number');
  });

  test('check if the return data is an object', async () => {
    const data = await commentsCounter(52795);
    expect(typeof data).toEqual('object');
  });
});