import { isObject } from '@/utils/is-object';

test('원시 타입을 테스트 한다', () => {
  expect(isObject(1)).toBeFalsy();
  expect(isObject('1')).toBeFalsy();
  expect(isObject(true)).toBeFalsy();
  expect(isObject(Symbol('foo'))).toBeFalsy();
  expect(isObject(null)).toBeFalsy();
  expect(isObject(undefined)).toBeFalsy();

  expect(isObject({ a: 12 })).toBeTruthy();
  expect(isObject([1, 2, 3])).toBeTruthy();
});
