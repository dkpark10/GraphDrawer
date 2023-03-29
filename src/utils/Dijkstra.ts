import { Graph } from '../redux/graph';
import PriorityQueue from 'ts-priority-queue';

interface EdgeInfo {
  [key: string]: { [key: string]: string };
}

type Pair = [number, string];

const INF = Math.floor(Number.MAX_SAFE_INTEGER / 987);

export class Dijkstra {

  private initGraph: Graph;
  private from: string;
  private to: string;
  private graph: EdgeInfo = {};
  private vertexCount: number = 0;

  constructor(builder: DijkstraBuilder) {

    this.initGraph = builder.getGraphInfo();
    this.from = builder.getFromVertex();
    this.to = builder.getToVertex();
    this.vertexCount = Number(this.initGraph.vertexCount);
  }

  public run() {

    this.mapping();

    if (this.isExistVertex() === false)
      return false;

    return this.backtracking(this.dijkstra());
  }

  public mapping() {

    Object.entries(this.initGraph.graph).forEach(ele => {

      const [currentVertex, value] = ele;

      if (this.isExceedVertexCount(this.graph) && value.length <= 0)
        return;

      this.graph[currentVertex] = this.graph[currentVertex] || {};

      value.forEach(ele2 => {

        const [nextVertex, cost] = ele2;
        if (nextVertex === undefined && cost === undefined)
          return;

        if (this.isExceedVertexCount(this.graph) && !this.graph[nextVertex])
          return;

        this.graph[nextVertex] = this.graph[nextVertex] || {};

        // 현재 정점과 연결된 정점 객체가 존재하지 않는다면
        if (Object.keys(this.graph[currentVertex]).includes(nextVertex) === false) {
          this.graph[currentVertex][nextVertex] = cost;
        }
        // 양방향으로 연결한다.
        if (Object.keys(this.graph[nextVertex]).includes(currentVertex) === false) {
          this.graph[nextVertex][currentVertex] = cost;
        }
      })
    });
  }

  public dijkstra() {

    const dist: { [key: string]: number } = {};
    const path: { [key: string]: string } = {};

    Object.keys(this.graph).forEach(ele => {
      dist[ele] = dist[ele] || INF
      path[ele] = path[ele] || ele;
    });

    dist[this.from] = 0;

    const pq = new PriorityQueue({ comparator: (a: Pair, b: Pair) => a[0] - b[0] });
    pq.queue([0, this.from]);

    while (pq.length) {

      const [cost, curVertex] = pq.peek();
      pq.dequeue();

      if (dist[curVertex] < cost)
        continue;

      Object.entries(this.graph[curVertex]).forEach(ele => {

        const [nextVertex, tmpcost] = ele;
        const nextCost = Number(tmpcost) + cost;

        if (nextCost < dist[nextVertex]) {
          path[nextVertex] = curVertex;
          dist[nextVertex] = nextCost;
          pq.queue([nextCost, nextVertex]);
        }
      });
    }
    return path;
  }

  // 최단경로 역추적
  public backtracking(path: { [key: string]: string }) {

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

  // from to 정점이 하나라도 없다면
  public isExistVertex() {
    return Object.keys(this.graph).includes(this.from) && Object.keys(this.graph).includes(this.to);
  }

  // 객체 키값 개수가 정점 개수를 초과하는가?
  public isExceedVertexCount(edg: EdgeInfo) {
    return Object.keys(this.graph).length >= this.vertexCount;
  }
}


export class DijkstraBuilder {

  private graphInfo: Graph;
  private from: string;
  private to: string;

  public setGraphInfo(graphInfo: Graph) {
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
    return new Dijkstra(this);
  }
}