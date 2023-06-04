import { DijkstraBuilder } from '@/utils';
import { GraphState } from '@/store/graph';

describe('다익스트라 테스트', () => {
  test('case1', () => {
    const graphInfo = {
      vertexCount: '6',
      graph: {
        '1': [
          {
            vertex: '2',
            cost: '2',
          },
          {
            vertex: '4',
            cost: '9',
          },
        ],
        '2': [
          {
            vertex: '3',
            cost: '8',
          },
        ],
        '3': [
          {
            vertex: '4',
            cost: '1',
          },
          {
            vertex: '6',
            cost: '9',
          },
        ],
        '4': [
          {
            vertex: '5',
            cost: '7',
          },
          {
            vertex: '6',
            cost: '6',
          },
        ],
        '5': [
          {
            vertex: '6',
            cost: '2',
          },
        ],
      },
    } as GraphState;

    const from = '1';
    const to = '6';

    const dijkstra = new DijkstraBuilder().setGraphInfo(graphInfo).setFromVertex(from).setToVertex(to).build();
    const shortestPath = dijkstra.run();

    const expected = ['1', '4', '6'];
    Object.keys(shortestPath).forEach((v, i) => {
      expect(expected[i]).toEqual(v);
    });

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ '1': 0, '2': 2, '3': 10, '4': 9, '5': 16, '6': 15 });
  });

  test('case2', () => {
    const graphInfo = {
      vertexCount: '5',
      graph: {
        '5': [
          {
            vertex: '1',
            cost: '1',
          },
        ],
        '1': [
          {
            vertex: '2',
            cost: '2',
          },
          {
            vertex: '3',
            cost: '3',
          },
        ],
        '2': [
          {
            vertex: '3',
            cost: '4',
          },
          {
            vertex: '4',
            cost: '5',
          },
        ],
        '3': [
          {
            vertex: '4',
            cost: '6',
          },
        ],
      },
    } as GraphState;

    const from = '1';
    const to = '4';

    const dijkstra = new DijkstraBuilder().setGraphInfo(graphInfo).setFromVertex(from).setToVertex(to).build();
    const shortestPath = dijkstra.run();

    const expected = ['1', '2', '4'];
    Object.keys(shortestPath).forEach((v, i) => {
      expect(expected[i]).toEqual(v);
    });

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ '1': 0, '2': 2, '3': 3, '4': 7, '5': 1 });
  });

  test('목적지까지 도달할 수 없을 때 테스트', () => {
    const graphInfo = {
      vertexCount: '6',
      graph: {
        A: [
          {
            vertex: 'B',
            cost: '1',
          },
          {
            vertex: 'D',
            cost: '1',
          },
        ],
        B: [
          {
            vertex: 'C',
            cost: '2',
          },
        ],
        E: [
          {
            vertex: 'F',
            cost: '3',
          },
        ],
      },
    } as GraphState;

    const from = 'A';
    const to = 'F';

    const dijkstra = new DijkstraBuilder().setGraphInfo(graphInfo).setFromVertex(from).setToVertex(to).build();
    dijkstra.run();

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ A: 0, B: 1, D: 1, C: 3, E: Infinity, F: Infinity });
  });
});
