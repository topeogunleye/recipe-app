import ItemsCounter from './itemsCounter'

// test for pagination
describe('return the lengty of array', () => {

  test('return the lengty of array', () => {
    const items = [1, 2, 3, 4, 5];
    const itemsCounter = new ItemsCounter(items);
    expect(itemsCounter.getLength()).toBe(5);
  });
});