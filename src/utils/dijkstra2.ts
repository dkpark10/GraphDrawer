/* eslint-disable max-classes-per-file */
import { HeapQueue } from './heap-queue';

interface EdgeInfo {
  [key: string]: { [key: string]: string };
}

type Pair = [number, string];

interface GraphState {
  graph: {
    [key: string]: Array<{ vertex: string; cost: string }>;
  };
}

type VertexString = `${string} ${string} ${string}`;

/** @todo 다익스트라가 너무 많은 일을 하고 있는 것 같다... */
export class Dijkstra2 {
  private initGraph: GraphState = {
    graph: {},
  };

  private from = '';

  private to = '';

  private graph: EdgeInfo = {};

  private distance: { [key: string]: number } = {};

  constructor(builder: DijkstraBuilder2) {
    this.initGraph = this.parseDataForDijkstra(builder.getGraphRawData());
    this.from = builder.getFromVertex();
    this.to = builder.getToVertex();
  }

  // eslint-disable-next-line class-methods-use-this
  public getVertexList(inputValue: string[]) {
    return inputValue
      .map((item): VertexString => {
        const [vertex1, vertex2, cost] = item.split(' ');
        return vertex1 < vertex2 ? `${vertex1} ${vertex2} ${cost}` : `${vertex2} ${vertex1} ${cost}`;
      })
      .reduce((acc, item) => {
        const [vertex1, vertex2] = item.split(' ');
        const vertexs = `${vertex1}${vertex2}`;

        const x = acc.find((v) => {
          const [v1, v2] = v.split(' ');
          const vs = `${v1}${v2}`;
          return vertexs === vs;
        });

        if (!x) {
          return [...acc, item];
        }

        return acc;
      }, [] as Array<VertexString>);
  }

  public parseDataForDijkstra(rawGraphData: string, LIMIT_INPUT_VALUE_LINE = 100): GraphState {
    const inputValue = rawGraphData.split('\n');

    const vertexList = this.getVertexList(inputValue);

    const graph = vertexList.reduce((acc, item, idx) => {
      const [vertex1, vertex2, cost] = item.split(' ');

      if (idx >= LIMIT_INPUT_VALUE_LINE) return acc;

      if (vertex1 === '') return acc;

      acc[vertex1] = acc[vertex1] || [];

      if (vertex2 === undefined && cost === undefined) return acc;

      if (vertex2 === '') return acc;

      acc[vertex1].push({ vertex: vertex2, cost });

      return acc;
    }, {} as GraphState['graph']);

    return { graph };
  }

  public run() {
    this.mapping();
    return this.backTracking(this.dijkstra());
  }

  public mapping() {
    Object.entries(this.initGraph.graph).forEach((ele) => {
      const [currentVertex, value] = ele;

      this.graph[currentVertex] = this.graph[currentVertex] || {};

      value.forEach((ele2) => {
        const { vertex, cost } = ele2;
        if (vertex === undefined && cost === undefined) return;

        this.graph[vertex] = this.graph[vertex] || {};

        // 현재 정점과 연결된 정점 객체가 존재하지 않는다면
        if (Object.keys(this.graph[currentVertex]).includes(vertex) === false) {
          this.graph[currentVertex][vertex] = cost;
        }
        // 양방향으로 연결한다.
        if (Object.keys(this.graph[vertex]).includes(currentVertex) === false) {
          this.graph[vertex][currentVertex] = cost;
        }
      });
    });
  }

  public dijkstra() {
    const prevVertexList: { [key: string]: string } = {};

    Object.keys(this.graph).forEach((ele) => {
      this.distance[ele] = this.distance[ele] || Infinity;
      prevVertexList[ele] = prevVertexList[ele] || ele;
    });

    this.distance[this.from] = 0;

    const pq = new HeapQueue<Pair>((a, b) => a[0] - b[0]);
    pq.push([0, this.from]);

    while (!pq.isEmpty()) {
      const [cost, curVertex] = pq.top();
      pq.pop();

      // eslint-disable-next-line no-continue
      if (this.distance[curVertex] < cost) continue;

      Object.entries(this.graph[curVertex]).forEach((ele) => {
        const [nextVertex, tmpCost] = ele;
        const nextCost = Number(tmpCost) + cost;

        if (nextCost < this.distance[nextVertex]) {
          prevVertexList[nextVertex] = curVertex;
          this.distance[nextVertex] = nextCost;
          pq.push([nextCost, nextVertex]);
        }
      });
    }

    return prevVertexList;
  }

  /** @description 최단경로 역추적하는 함수 */
  public backTracking(prevVertexList: { [key: string]: string }): Array<string> {
    const shortestPath: { [key: string]: boolean } = {};
    let x = this.to;

    while (x !== prevVertexList[x]) {
      shortestPath[x] = shortestPath[x] || false;
      x = prevVertexList[x];
    }

    shortestPath[x] = shortestPath[x] || false;
    shortestPath[this.to] = true;
    shortestPath[this.from] = true;

    return Object.keys(shortestPath).map((ele) => ele);
  }

  public getDist() {
    return this.distance;
  }
}

export class DijkstraBuilder2 {
  private rawGraphData = '';

  private from = '';

  private to = '';

  public setGraphRawData(rawData: string) {
    this.rawGraphData = rawData;
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

  public getGraphRawData() {
    return this.rawGraphData;
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
