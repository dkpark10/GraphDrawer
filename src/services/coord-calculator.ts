/* eslint-disable max-classes-per-file */
import { GraphState } from '../store/graph';

export interface Vertex {
  connectedList: string[][];
  coord: Point;
}

export interface Point {
  y: number;
  x: number;
}

/**
 * @description 정점의 좌표를 배치하는 클래스
 */
export class VertexCoordCalculator {
  private graphInfo: GraphState;

  private vertexCount = 0;

  private leftTop: Point;

  private rightBottom: Point;

  private nodeCoord: Point[] = [];

  private readonly HORIZONTAL_AXIS = 0;

  constructor(builder: VertexCoordCalculatorBuilder) {
    this.graphInfo = builder.getGraphInfo();
    this.leftTop = builder.getLeftTop();
    this.rightBottom = builder.getRightBottom();
    this.vertexCount = Number(this.graphInfo.vertexCount);
  }

  /**
   * @description 이진분할로 좌표를 랜덤 배치한다.
   */
  public run() {
    this.BinarySpacePartitioning({ ...this.leftTop }, { ...this.rightBottom }, 0);
    this.extractNodeCoordList();

    return this.extractVertex();
  }

  public BinarySpacePartitioning(leftTop: Point, rightBottom: Point, depth: number) {
    if (2 ** depth >= this.vertexCount) {
      const randomY = Math.floor(Math.random() * (rightBottom.y - leftTop.y) + leftTop.y);
      const randomX = Math.floor(Math.random() * (rightBottom.x - leftTop.x) + leftTop.x);

      this.nodeCoord.push({ y: randomY, x: randomX });

      return;
    }

    const axis = Math.floor(Math.floor(Math.random() * 2));
    const ratio = Math.floor(Math.random() * (6 - 3) + 4);

    if (axis === this.HORIZONTAL_AXIS) {
      const height = ((rightBottom.y - leftTop.y) * ratio) / 10 + leftTop.y;
      this.BinarySpacePartitioning({ ...leftTop }, { y: height, x: rightBottom.x }, depth + 1);
      this.BinarySpacePartitioning({ y: height + 1, x: leftTop.x }, { ...rightBottom }, depth + 1);
    } else {
      const width = ((rightBottom.x - leftTop.x) * ratio) / 10 + leftTop.x;
      this.BinarySpacePartitioning({ ...leftTop }, { y: rightBottom.y, x: width }, depth + 1);
      this.BinarySpacePartitioning({ y: leftTop.y, x: width + 1 }, { ...rightBottom }, depth + 1);
    }
  }

  // 랜덤한 노드 좌표 중 노드갯수만큼 뽑아낸다.
  public extractNodeCoordList() {
    let cnt = this.nodeCoord.length - this.vertexCount;

    while (cnt) {
      const { length } = this.nodeCoord;
      const idx = Math.floor(Math.random() * length);
      this.nodeCoord.splice(idx, 1);
      cnt -= 1;
    }
  }

  // 정점만 추출해낸다.
  public extractVertex(init = { connectedList: [], coord: undefined }) {
    const vertexList: { [key: string]: Vertex } = {};

    Object.entries(this.graphInfo.graph).forEach((ele) => {
      const [key, value] = ele;

      // 정점 객수를 넘어가면 리턴
      if (Object.keys(vertexList).length >= this.vertexCount && Object.keys(vertexList).includes(key) === false) return;

      vertexList[key] = vertexList[key] || { ...init };
      if (!vertexList[key].coord) {
        vertexList[key].coord = this.nodeCoord[0];
        this.nodeCoord.shift();
      }

      vertexList[key].connectedList = this.connect(vertexList, value);
    });

    return vertexList;
  }

  public connect(vertexList: { [key: string]: Vertex }, connectedList: string[][]) {
    const ret: string[][] = [];
    connectedList.forEach((vele) => {
      if (vele[0] === '' || vele[0] === undefined) return;

      // 키값 개수는 정점갯수를 넘고 새로운 정점키값일 경우 리턴
      if (Object.keys(vertexList).length >= this.vertexCount && vertexList[vele[0]] === undefined) return;

      ret.push(vele);
      vertexList[vele[0]] = vertexList[vele[0]] || { connectedList: [], coord: undefined };

      if (!vertexList[vele[0]].coord) {
        vertexList[vele[0]].coord = this.nodeCoord[0];
        this.nodeCoord.shift();
      }
    });

    return ret;
  }
}

export class VertexCoordCalculatorBuilder {
  private graphInfo: GraphState = {} as GraphState;

  private leftTop: Point = { y: 0, x: 0 };

  private rightBottom: Point = { y: 0, x: 0 };

  public setGraphInfo(graphInfo: GraphState) {
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
    return new VertexCoordCalculator(this);
  }
}
