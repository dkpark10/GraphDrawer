/* eslint-disable max-classes-per-file */
import { HeapQueue } from './heap-queue';
import { GraphData } from '@/types/graph';
import { parseGraph } from '@/services/parse-graph';

export type AllNumber = { [key: string]: number };

type Pair = { currentCost: number; currentVertex: string };

/** @todo 다익스트라가 너무 많은 일을 하고 있는 것 같다... */
export class Dijkstra2 {
  private rawInputData = '';

  private graphData: GraphData = {} as GraphData;

  private begin = '';

  private end = '';

  private distance: AllNumber = {};

  /** @description 다익스트라용 링크 데이터 */
  private transferLinkData: { [key: string]: Array<{ nextVertex: string; cost: number }> } = {};

  constructor(builder: DijkstraBuilder2) {
    this.rawInputData = builder.getGraphData();
    this.begin = builder.getBeginVertex();
    this.end = builder.getEndVertex();
    this.graphData = parseGraph(this.rawInputData);
  }

  public run() {
    return this.backTracking(this.dijkstra());
  }

  public dijkstra() {
    const { nodes, links } = this.graphData;

    links.forEach(({ source, target, cost }) => {
      this.transferLinkData[source as string] = this.transferLinkData[source as string] || [];
      this.transferLinkData[source as string].push({ nextVertex: target as string, cost: Number(cost) || Infinity });
    });

    /** @description 각정점들의 거리 초기화 */
    this.distance = nodes.reduce(
      (acc, { value }) => ({
        ...acc,
        [value]: Infinity,
      }),
      {} as AllNumber,
    );

    const prevVertexList: { [key: string]: string } = {};
    this.distance[this.begin] = 0;

    const pq = new HeapQueue<Pair>((a, b) => a.currentCost - b.currentCost);
    pq.push({ currentCost: 0, currentVertex: this.begin });

    while (!pq.isEmpty()) {
      const { currentCost, currentVertex } = pq.top();
      pq.pop();

      // eslint-disable-next-line no-continue
      if (this.distance[currentVertex] < currentCost) continue;

      // eslint-disable-next-line no-continue
      if (!this.transferLinkData[currentVertex]) continue;

      this.transferLinkData[currentVertex].forEach((ele) => {
        const { nextVertex, cost } = ele;
        const nextCost = cost + currentCost;

        if (nextCost < this.distance[nextVertex]) {
          prevVertexList[nextVertex] = currentVertex;
          this.distance[nextVertex] = nextCost;
          pq.push({ currentCost: nextCost, currentVertex: nextVertex });
        }
      });
    }

    return prevVertexList;
  }

  /** @description 최단경로 역추적하는 함수 */
  public backTracking(prevVertexList: { [key: string]: string }): Array<string> {
    if (this.distance[this.end] === Infinity) {
      return [];
    }

    const shortestPath: { [key: string]: boolean } = {};
    let x = this.end;

    while (x !== prevVertexList[x] && x !== this.begin) {
      shortestPath[x] = shortestPath[x] || false;
      x = prevVertexList[x];
    }

    shortestPath[x] = shortestPath[x] || false;
    shortestPath[this.begin] = true;
    shortestPath[this.end] = true;

    return Object.keys(shortestPath).map((ele) => ele);
  }

  public getDist() {
    return this.distance;
  }
}

export class DijkstraBuilder2 {
  private rawInputData = '';

  private end = '';

  private begin = '';

  public setGraphRawData(rawInputData: string) {
    this.rawInputData = rawInputData;
    return this;
  }

  public setFromVertex(begin: string) {
    this.begin = begin;
    return this;
  }

  public setToVertex(end: string) {
    this.end = end;
    return this;
  }

  public getGraphData() {
    return this.rawInputData;
  }

  public getBeginVertex() {
    return this.begin;
  }

  public getEndVertex() {
    return this.end;
  }

  public build() {
    return new Dijkstra2(this);
  }
}
