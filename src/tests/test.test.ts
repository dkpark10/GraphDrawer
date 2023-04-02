import { inputValueParsing, add } from '@/services';

test('순수', () => {
  expect(1 + 2).toEqual(3);
  expect(add(1, 2)).toBe(3);
});
