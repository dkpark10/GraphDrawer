// import { DijkstraBuilder } from '@/utils';
import { DijkstraBuilder2 } from '@/utils/dijkstra2';
import { isShortestEdge } from '@/components/molecules/Main';

describe('다익스트라 테스트', () => {
  test('최단경로 테스트1', () => {
    const rawData = '1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex('1').setToVertex('6').build();

    const shortestPath = dijkstra.run();
    const distance = dijkstra.getDist();

    expect(shortestPath).toEqual(['1', '4', '6']);
    expect(distance).toEqual({ '1': 0, '2': 2, '3': 10, '4': 9, '5': 16, '6': 15 });
  });

  test('최단경로 테스트2', () => {
    const rawData = '5 1 1\n1 2 2\n1 3 3\n2 3 4\n2 4 5\n3 4 6';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex('1').setToVertex('4').build();

    const shortestPath = dijkstra.run();
    const distance = dijkstra.getDist();

    expect(shortestPath).toEqual(['1', '2', '4']);
    expect(distance).toEqual({ '1': 0, '2': 2, '3': 3, '4': 7, '5': Infinity });
  });

  test('최단경로 테스트3', () => {
    const rawData = '1 2 1\n4 1 2\n2 3 2\n1 3 5\n';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex('1').setToVertex('3').build();

    const shortestPath = dijkstra.run();
    const distance = dijkstra.getDist();

    expect(shortestPath).toEqual(['1', '2', '3']);
    expect(distance).toEqual({ '1': 0, '2': 1, '3': 3, '4': Infinity });
  });

  test('최단경로 테스트4', () => {
    const rawData = '1 2 5\n2 3 6\n3 4 2\n1 3 15\n';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex('1').setToVertex('4').build();

    const shortestPath = dijkstra.run();
    const distance = dijkstra.getDist();

    expect(shortestPath).toEqual(['1', '2', '3', '4']);
    expect(distance).toEqual({ '1': 0, '2': 5, '3': 11, '4': 13 });
  });

  test('최단경로 테스트5 도착하지 못할 때', () => {
    const rawData = 'A B 1\nA D 1\nB C 2\nE F 3';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex('A').setToVertex('F').build();

    const shortestPath = dijkstra.run();
    const distance = dijkstra.getDist();

    expect(distance).toEqual({ A: 0, B: 1, D: 1, C: 3, E: Infinity, F: Infinity });
    expect(shortestPath).toEqual([]);
  });

  test('최단경로 테스트6 3개의 노드', () => {
    const rawData = '1 2 3\n2 3 4\n1 3 99\n';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex('1').setToVertex('3').build();

    const shortestPath = dijkstra.run();
    const distance = dijkstra.getDist();

    expect(distance).toEqual({ 1: 0, 2: 3, 3: 7 });
    expect(shortestPath).toEqual(['1', '2', '3']);

    expect(isShortestEdge('1', '2', shortestPath)).not.toBeTruthy();
    expect(isShortestEdge('1', '2', shortestPath)).not.toBeTruthy();
  });
});
