import { Graph } from '../redux/graph';

export interface Vertex {
  connectedList: string[][];
  coord: Point;
}

export class Point {

  public readonly y: number;
  public readonly x: number;

  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
  }
}

export class CoordCalculator {

  private graphInfo: Graph;
  private vertexCount: number = 0;
  private leftTop: Point;
  private rightBottom: Point;
  private nodeCoord: Point[] = [];

  constructor(builder: CoordCalculatorBuilder) {

    this.graphInfo = builder.getGraphInfo();
    this.leftTop = builder.getLeftTop();
    this.rightBottom = builder.getRightBottom();
    this.vertexCount = Number(this.graphInfo.vertexCount);
  }

  // 1. 이진분할로 좌표 배치 셋팅
  // 2. 노드갯수만큼 추출

  public run() {

    this.BinarySpacePartitioning({ ...this.leftTop }, { ...this.rightBottom }, 0);
    this.extractNodeCoordList();

    // return this.setVertexInfo(this.extractVertex());
    return this.extractVertex();
  }

  public BinarySpacePartitioning(leftTop: Point, rightBottom: Point, depth: number) {

    if (2 ** depth >= this.vertexCount) {

      const randomY = Math.floor(Math.random() * (rightBottom.y - leftTop.y) + leftTop.y);
      const randomX = Math.floor(Math.random() * (rightBottom.x - leftTop.x) + leftTop.x);

      this.nodeCoord.push(new Point(randomY, randomX));

      return;
    }

    const axis = Math.floor(Math.floor(Math.random() * 2));
    const ratio = Math.floor((Math.random() * (6 - 3)) + 4);

    // 가로로 나눔
    if (axis === 0) {

      const height = (((rightBottom.y - leftTop.y) * ratio) / 10) + leftTop.y;
      this.BinarySpacePartitioning({ ...leftTop }, new Point(height, rightBottom.x), depth + 1);
      this.BinarySpacePartitioning(new Point(height + 1, leftTop.x), { ...rightBottom }, depth + 1);
    }
    // 세로로 나눔
    else {
      const width = (((rightBottom.x - leftTop.x) * ratio) / 10) + leftTop.x;
      this.BinarySpacePartitioning({ ...leftTop }, new Point(rightBottom.y, width), depth + 1);
      this.BinarySpacePartitioning(new Point(leftTop.y, width + 1), { ...rightBottom }, depth + 1);
    }
  }

  // 랜덤한 노드 좌표 중 노드갯수만큼 뽑아낸다.
  public extractNodeCoordList() {

    let cnt = this.nodeCoord.length - this.vertexCount;

    while (cnt) {
      const length = this.nodeCoord.length;
      const idx = Math.floor(Math.random() * length);
      this.nodeCoord.splice(idx, 1);
      cnt--;
    }
  }

  // 정점만 추출해낸다.
  public extractVertex(init = { connectedList: [], coord: undefined }) {

    const vertexList: { [key: string]: Vertex } = {};

    Object.entries(this.graphInfo.graph).forEach((ele, idx) => {

      const [key, value] = ele;

      // 정점 객수를 넘어가면 리턴
      if (Object.keys(vertexList).length >= this.vertexCount)
        return;

      vertexList[key] = vertexList[key] || { ...init };
      if (!vertexList[key].coord) {
        vertexList[key].coord = this.nodeCoord[0];
        this.nodeCoord.shift();
      }

      vertexList[key].connectedList = this.connect(vertexList, value);
    })

    return vertexList;
  }

  public connect(vertexList: { [key: string]: Vertex }, connectedList: string[][]) {

    const ret: string[][] = [];
    connectedList.forEach(vele => {

      if (vele[0] === '' || vele[0] === undefined)
        return;

      // 키값 개수는 정점갯수를 넘고 새로운 정점키값일 경우 리턴
      if (Object.keys(vertexList).length >= this.vertexCount
      && vertexList[vele[0]] === undefined )
        return;

      ret.push(vele);
      vertexList[vele[0]] = vertexList[vele[0]] || { connectedList: [], coord: undefined };

      if (!vertexList[vele[0]].coord) {
        vertexList[vele[0]].coord = this.nodeCoord[0];
        this.nodeCoord.shift();
      }
    })

    return ret;
  }
}

export class CoordCalculatorBuilder {

  private graphInfo: Graph;
  private leftTop: Point;
  private rightBottom: Point;

  public setGraphInfo(graphInfo: Graph) {
    this.graphInfo = graphInfo;
    return this;
  }

  public setLeftTop(pt: Point) {
    this.leftTop = pt;
    return this;
  }

  public setRightBottom(pt: Point) {
    this.rightBottom = pt;
    return this;
  }

  public getGraphInfo() {
    return this.graphInfo;
  }

  public getLeftTop() {
    return this.leftTop;
  }

  public getRightBottom() {
    return this.rightBottom;
  }

  public build() {
    return new CoordCalculator(this);
  }
}