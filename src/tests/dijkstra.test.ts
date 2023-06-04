import { DijkstraBuilder } from '@/utils';
import { DijkstraBuilder2 } from '@/utils/dijkstra2';

describe('다익스트라 테스트', () => {
  test('case1', () => {
    const rawData = '6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9';
    const from = '1';
    const to = '6';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex(from).setToVertex(to).build();
    const shortestPath = dijkstra.run();

    const expected = ['1', '4', '6'];
    Object.keys(shortestPath).forEach((v, i) => {
      expect(expected[i]).toEqual(v);
    });

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ '1': 0, '2': 2, '3': 10, '4': 9, '5': 16, '6': 15 });
  });

  test('case2', () => {
    const rawData = '5\n5 1 1\n1 2 2\n1 3 3\n2 3 4\n2 4 5\n3 4 6';

    const from = '1';
    const to = '4';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex(from).setToVertex(to).build();
    const shortestPath = dijkstra.run();

    const expected = ['1', '2', '4'];
    Object.keys(shortestPath).forEach((v, i) => {
      expect(expected[i]).toEqual(v);
    });

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ '1': 0, '2': 2, '3': 3, '4': 7, '5': 1 });
  });

  test('목적지까지 도달할 수 없을 때 테스트', () => {
    const rawData = '6\nA B 1\nA D 1\nB C 2\nE F 3';
    const from = 'A';
    const to = 'F';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex(from).setToVertex(to).build();
    dijkstra.run();

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ A: 0, B: 1, D: 1, C: 3, E: Infinity, F: Infinity });
  });
});
