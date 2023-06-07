// import { DijkstraBuilder } from '@/utils';
import { DijkstraBuilder2 } from '@/utils/dijkstra2';
import { parseGraph } from '@/services';
import { HeapQueue } from '@/utils';

const tempDijkStra = (rawInputData: string, begin: string, end: string) => {
  const { nodes, links } = parseGraph(rawInputData);

  const parerLinks: { [key: string]: Array<{ nextVertex: string; cost: number }> } = {};
  links.forEach(({ source, target, cost }) => {
    parerLinks[source as string] = parerLinks[source as string] || [];
    parerLinks[source as string].push({ nextVertex: target as string, cost: Number(cost) || Infinity });
  });

  /** @description 각정점들의 거리 초기화 */
  const distance: { [key: string]: number } = nodes.reduce(
    (acc, { value }) => ({
      ...acc,
      [value]: Infinity,
    }),
    {} as { [key: string]: number },
  );

  type Pair = { currentCost: number; currentVertex: string };

  const prevVertexList: { [key: string]: string } = {};
  distance[begin] = 0;

  const pq = new HeapQueue<Pair>((a, b) => a.currentCost - b.currentCost);
  pq.push({ currentCost: 0, currentVertex: begin });

  while (!pq.isEmpty()) {
    const { currentCost, currentVertex } = pq.top();
    pq.pop();

    // eslint-disable-next-line no-continue
    if (distance[currentVertex] < currentCost) continue;

    // eslint-disable-next-line no-continue
    if (!parerLinks[currentVertex]) continue;

    parerLinks[currentVertex].forEach((ele) => {
      const { nextVertex, cost } = ele;
      const nextCost = cost + currentCost;

      if (nextCost < distance[nextVertex]) {
        prevVertexList[nextVertex] = currentVertex;
        distance[nextVertex] = nextCost;
        pq.push({ currentCost: nextCost, currentVertex: nextVertex });
      }
    });
  }

  /** @description 경로 도달 실패 */
  if (distance[end] === Infinity) {
    return {
      distance,
      finalResult: null,
    };
  }

  const shortestPath: { [key: string]: boolean } = {};
  let x = end;

  while (x !== prevVertexList[x] && x !== begin) {
    shortestPath[x] = shortestPath[x] || false;
    x = prevVertexList[x];
  }

  shortestPath[x] = shortestPath[x] || false;
  shortestPath[end] = true;
  shortestPath[begin] = true;

  const finalResult = Object.keys(shortestPath).map((ele) => ele);

  return {
    distance,
    finalResult,
  };
};

describe('다익스트라 테스트', () => {
  test('case1', () => {
    const rawData = '1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9';
    const from = '1';
    const to = '6';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex(from).setToVertex(to).build();
    const shortestPath = dijkstra.run();

    const expected = ['1', '4', '6'];
    expect(expected).toEqual(shortestPath);

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ '1': 0, '2': 2, '3': 10, '4': 9, '5': 16, '6': 15 });
  });

  test('case2', () => {
    const rawData = '5 1 1\n1 2 2\n1 3 3\n2 3 4\n2 4 5\n3 4 6';

    const from = '1';
    const to = '4';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex(from).setToVertex(to).build();
    const shortestPath = dijkstra.run();

    const expected = ['1', '2', '4'];
    expect(expected).toEqual(shortestPath);

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ '1': 0, '2': 2, '3': 3, '4': 7, '5': 1 });
  });

  test('목적지까지 도달할 수 없을 때 테스트', () => {
    const rawData = 'A B 1\nA D 1\nB C 2\nE F 3';
    const from = 'A';
    const to = 'F';

    const dijkstra = new DijkstraBuilder2().setGraphRawData(rawData).setFromVertex(from).setToVertex(to).build();
    dijkstra.run();

    const dist = dijkstra.getDist();
    expect(dist).toEqual({ A: 0, B: 1, D: 1, C: 3, E: Infinity, F: Infinity });
  });

  test('최단경로 테스트1', () => {
    const rawData = '1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9';
    const { distance, finalResult } = tempDijkStra(rawData, '1', '6');

    expect(distance).toEqual({ '1': 0, '2': 2, '3': 10, '4': 9, '5': 16, '6': 15 });
    expect(finalResult).toEqual(['1', '4', '6']);
  });

  test('최단경로 테스트2', () => {
    const rawData = '5 1 1\n1 2 2\n1 3 3\n2 3 4\n2 4 5\n3 4 6';
    const { distance, finalResult } = tempDijkStra(rawData, '1', '4');

    expect(distance).toEqual({ '1': 0, '2': 2, '3': 3, '4': 7, '5': Infinity });
    expect(finalResult).toEqual(['1', '2', '4']);
  });

  test('최단경로 테스트3', () => {
    const rawData = '1 2 1\n4 1 2\n2 3 2\n1 3 5\n';
    const { distance, finalResult } = tempDijkStra(rawData, '1', '3');

    expect(distance).toEqual({ '1': 0, '2': 1, '3': 3, '4': Infinity });
    expect(finalResult).toEqual(['1', '2', '3']);
  });

  test('최단경로 테스트4', () => {
    const rawData = '1 2 5\n2 3 6\n3 4 2\n1 3 15\n';
    const { distance, finalResult } = tempDijkStra(rawData, '1', '4');

    expect(distance).toEqual({ '1': 0, '2': 5, '3': 11, '4': 13 });
    expect(finalResult).toEqual(['1', '2', '3', '4']);
  });

  test('최단경로 테스트5', () => {
    const rawData = 'A B 1\nA D 1\nB C 2\nE F 3';
    const { distance, finalResult } = tempDijkStra(rawData, 'A', 'F');

    expect(distance).toEqual({ A: 0, B: 1, D: 1, C: 3, E: Infinity, F: Infinity });
    expect(finalResult).toEqual(null);
  });
});
