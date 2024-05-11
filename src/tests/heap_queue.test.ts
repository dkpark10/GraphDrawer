import { HeapQueue } from '@/utils';

interface Person {
  height: number;
  weight: number;
  grade: number;
}

/**
 * @see {@link http://siever.info/cs351/hw/prj2/PQTestCases.html}
 */
describe('우선순위 큐 테스트', () => {
  test('test 0', () => {
    const pq = new HeapQueue<number>();
    expect(pq.size()).toBe(0);
  });

  test('test 1', () => {
    const pq = new HeapQueue<number>();
    expect(pq.isEmpty()).toBeTruthy();
  });

  test('test 2', () => {
    const pq = new HeapQueue<number>();
    pq.push(123);
    expect(pq.size()).toBe(1);
  });

  test('test 3', () => {
    const pq = new HeapQueue<number>();
    const fn = pq.top.bind(pq);
    expect(fn).toThrow();
  });

  test('test 4', () => {
    const pq = new HeapQueue<number>();
    const fn = pq.pop.bind(pq);
    expect(fn).toThrow();
  });

  test.skip('test 5 유효하지 않은 타입', () => {
    const pq = new HeapQueue<number>();
    // @ts-expect-error 타입 에러
    expect(pq.push('1')).toThrow();
  });

  test('test 6', () => {
    const pq = new HeapQueue<number>();
    pq.push(123);
    expect(pq.isEmpty()).toBeFalsy();
  });

  test('test 7', () => {
    const pq = new HeapQueue<number>();
    pq.push(1);
    expect(pq.top()).toBe(1);
  });

  test('test 8', () => {
    const pq = new HeapQueue<number>();
    pq.push(1);
    pq.pop();
    expect(pq.size()).toBe(0);
  });

  test('test 9', () => {
    const pq = new HeapQueue<number>();
    pq.push(1);
    pq.pop();
    expect(pq.isEmpty()).toBeTruthy();
  });

  test('test 10', () => {
    const pq = new HeapQueue<number>();
    pq.push(1);
    pq.pop();
    const fn = pq.pop.bind(pq);
    expect(fn).toThrow();
  });

  test('test 11', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(1);
    pq.push(2);
    pq.pop();
    expect(pq.top()).toBe(2);
  });

  test('test 12', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(2);
    pq.push(1);
    expect(pq.top()).toBe(1);
  });

  test('test 13', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(2);
    pq.push(3);
    pq.push(1);
    pq.push(4);
    pq.push(5);
    pq.push(6);
    expect(pq.top()).toBe(1);
  });

  test('test 14', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(2);
    pq.push(3);
    pq.push(4);
    pq.push(5);
    pq.push(6);
    pq.push(1);
    expect(pq.top()).toBe(1);
  });

  test('test 15', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(6);
    pq.push(2);
    pq.push(4);
    pq.push(3);
    pq.push(1);
    pq.push(5);
    expect(pq.top()).toBe(1);
  });

  test('test 16', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(6);
    pq.push(2);
    pq.push(4);
    pq.push(3);
    pq.push(1);
    pq.push(5);
    pq.pop();
    expect(pq.top()).toBe(2);
  });

  test('test 17', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(6);
    pq.push(2);
    pq.push(4);
    pq.push(-3);
    pq.push(3);
    pq.push(1);
    pq.push(5);
    expect(pq.top()).toBe(-3);
  });

  test('오름차순 숫자', () => {
    const pq = new HeapQueue<number>();

    expect(pq.size()).toBe(0);
    expect(pq.isEmpty()).toBeTruthy();

    pq.push(123);
    expect(pq.size()).toBe(1);
    expect(pq.isEmpty()).toBe(false);

    pq.push(2);
    pq.push(46);
    pq.push(1);
    pq.push(55);

    expect(pq.size()).toBe(5);
    expect(pq.top()).toBe(123);

    pq.pop();
    pq.pop();

    expect(pq.size()).toBe(3);
    expect(pq.top()).toBe(46);

    pq.pop();
    pq.pop();
    pq.pop();

    expect(pq.size()).toBe(0);
    expect(pq.isEmpty()).toBeTruthy();
  });

  test('내림차순 숫자', () => {
    const pq = new HeapQueue<number>(true);

    expect(pq.size()).toBe(0);
    expect(pq.isEmpty()).toBeTruthy();

    pq.push(123);
    expect(pq.size()).toBe(1);
    expect(pq.isEmpty()).toBe(false);

    pq.push(2);
    pq.push(46);
    pq.push(1);
    pq.push(55);

    expect(pq.size()).toBe(5);
    expect(pq.top()).toBe(1);

    pq.pop();

    expect(pq.size()).toBe(4);
    expect(pq.top()).toBe(2);

    pq.pop();
    pq.pop();
    pq.pop();
    pq.pop();

    expect(pq.size()).toBe(0);
    expect(pq.isEmpty()).toBeTruthy();
  });

  test('객체 테스트', () => {
    const p1: Person = {
      height: 3222,
      weight: 22,
      grade: 1,
    };

    const p2: Person = {
      height: 3222,
      weight: 22,
      grade: 9,
    };

    const p3: Person = {
      height: 88,
      weight: 4532,
      grade: 1,
    };

    const p4 = {
      height: 88,
      weight: 184,
      grade: 2,
    } as Person;

    const pq = new HeapQueue<Person>((prev, next) => {
      if (prev.height === next.height) {
        if (prev.weight === next.weight) {
          return prev.grade - next.grade;
        }
        return next.weight - prev.weight;
      }
      return next.height - prev.height;
    });

    pq.push(p1);
    pq.push(p2);
    pq.push(p3);
    pq.push(p4);

    expect(pq.top()).toBe(p1);
    pq.pop();
    expect(pq.top()).toBe(p2);
  });

  test('타입이 객체일 경우 comparator 함수가 등록되어 있지 않다면 에러를 반환한다.', () => {
    const pq = new HeapQueue<Person>();
    const p1: Person = {
      height: 3222,
      weight: 22,
      grade: 1,
    };

    const fn = pq.push.bind(pq);
    expect(() => fn(p1)).toThrow();
  });
});
