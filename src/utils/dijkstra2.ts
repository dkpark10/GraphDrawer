/* eslint-disable max-classes-per-file */
import { PriorityQueue } from './heap-queue';
import { type GraphState, initialState } from '@/store/graph';
import { GraphData } from '@/types/graph';

export const INFINITY = Math.floor(Number.MAX_SAFE_INTEGER / 987);

export class Dijkstra2 {
  private initGraph: GraphData = { nodes: [], links: [] };

  private from = '';

  private to = '';

  private dist: { [key: string]: number } = {};

  constructor(builder: DijkstraBuilder2) {
    this.initGraph = builder.getGraphInfo();
    this.from = builder.getFromVertex();
    this.to = builder.getToVertex();
  }

  public run() {
    return this.initGraph;
  }

  // public dijkstra() {
  //   const path: { [key: string]: string } = {};

  //   Object.keys(this.graph).forEach((ele) => {
  //     this.dist[ele] = this.dist[ele] || INFINITY;
  //     path[ele] = path[ele] || ele;
  //   });

  //   this.dist[this.from] = 0;

  //   const pq = new PriorityQueue<Pair>((a, b) => a[0] - b[0]);
  //   pq.push([0, this.from]);

  //   while (!pq.isEmpty()) {
  //     const [cost, curVertex] = pq.top();
  //     pq.pop();

  //     // eslint-disable-next-line no-continue
  //     if (this.dist[curVertex] < cost) continue;

  //     Object.entries(this.graph[curVertex]).forEach((ele) => {
  //       const [nextVertex, tmpcost] = ele;
  //       const nextCost = Number(tmpcost) + cost;

  //       if (nextCost < this.dist[nextVertex]) {
  //         path[nextVertex] = curVertex;
  //         this.dist[nextVertex] = nextCost;
  //         pq.push([nextCost, nextVertex]);
  //       }
  //     });
  //   }

  //   return path;
  // }

  /** @description 최단경로 역추적하는 함수 */
  public backTracking(path: { [key: string]: string }) {
    const ret: { [key: string]: boolean } = {};
    let x = this.to;

    while (x !== path[x]) {
      ret[x] = ret[x] || false;
      x = path[x];
    }

    ret[x] = ret[x] || false;
    ret[this.to] = true;
    ret[this.from] = true;

    return ret;
  }
}

export class DijkstraBuilder2 {
  private graphInfo: GraphData = { nodes: [], links: [] };

  private from = '';

  private to = '';

  public setGraphInfo(graphInfo: GraphData) {
    this.graphInfo = graphInfo;
    return this;
  }

  public setFromVertex(from: string) {
    this.from = from;
    return this;
  }

  public setToVertex(to: string) {
    this.to = to;
    return this;
  }

  public getGraphInfo() {
    return this.graphInfo;
  }

  public getFromVertex() {
    return this.from;
  }

  public getToVertex() {
    return this.to;
  }

  public build() {
    return new Dijkstra2(this);
  }
}
