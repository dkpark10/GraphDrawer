export type Comparator<T> = boolean | ((a: T, b: T) => number);

export default class HeapQueue<T> {
  private readonly list: T[] = [];

  private readonly comparator: Comparator<T>;

  private readonly ascending = false;

  constructor(comparator?: Comparator<T>) {
    this.comparator = comparator || false;
  }

  private swap(idx1: number, idx2: number) {
    [this.list[idx1], this.list[idx2]] = [this.list[idx2], this.list[idx1]];
  }

  public compare(current: T, target: T): boolean {
    if (typeof this.comparator === 'boolean') {
      if (this.comparator === this.ascending) {
        return current > target;
      }
      return current < target;
    }

    return this.comparator(current, target) < 1;
  }

  public push(item: T) {
    this.list.push(item);
    let idx = this.list.length - 1;
    let parentNodeIndex = Math.ceil(idx / 2) - 1;

    if (this.list.length === 1) {
      return;
    }

    while (idx > 0 && this.compare(item, this.list[parentNodeIndex])) {
      this.swap(idx, parentNodeIndex);
      idx = Math.ceil(idx / 2) - 1;
      parentNodeIndex = Math.ceil(idx / 2) - 1;
    }
  }

  public pop() {
    if (this.isEmpty()) {
      return;
    }

    const rootValue = this.list.slice(-1)[0];
    this.list[0] = rootValue;
    this.list.pop();

    let idx = 0;

    while (idx * 2 < this.list.length - 1) {
      const leftChildIndex = idx * 2 + 1;
      const rightChildIndex = idx * 2 + 2;

      if (this.list[leftChildIndex] === undefined) {
        break;
      }

      if (this.list[rightChildIndex] === undefined) {
        if (!this.compare(this.list[idx], this.list[leftChildIndex])) {
          this.swap(idx, leftChildIndex);
        }
        break;
      }

      if (
        this.compare(this.list[idx], this.list[leftChildIndex]) &&
        this.compare(this.list[idx], this.list[rightChildIndex])
      ) {
        break;
      }

      if (this.compare(this.list[leftChildIndex], this.list[rightChildIndex])) {
        this.swap(idx, leftChildIndex);
        idx = leftChildIndex;
      } else {
        this.swap(idx, rightChildIndex);
        idx = rightChildIndex;
      }
    }
  }

  public size(): number {
    return this.list.length - 1;
  }

  public isEmpty(): boolean {
    return this.list.length <= 0;
  }

  public top(): T {
    return this.list[0];
  }
}
