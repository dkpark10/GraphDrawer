import { Graph } from '../redux/index';

export interface Vertex {
  coord: Point;
  value: string;
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
  private vertexCount: number;
  private leftTop: Point;
  private rightBottom: Point;
  private nodeCoord: Point[] = [];
  private vertexInfo: Vertex[] = [];

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
    this.setVertexInfo();

    return this.vertexInfo;
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

  public setVertexInfo() {

    const vertexList: { [key: string]: any } = {};

    Object.entries(this.graphInfo.graph).forEach(ele => {
      const [key, value] = ele;
      vertexList[key] = vertexList[key] || key;

      value.forEach(vele => {
        vertexList[vele[0]] = vertexList[vele[0]] || vele[0];
      });
    })

    console.log(vertexList);
    Object.entries(vertexList).forEach((ele, idx) => {
      const [key, value] = ele;
      this.vertexInfo.push({ coord: this.nodeCoord[idx], value: value });
    });
  }

  public getNodeCoordList(): Point[] {
    return this.nodeCoord;
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