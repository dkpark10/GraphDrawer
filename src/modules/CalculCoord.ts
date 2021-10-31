export interface Size {
  width: number;
  height: number;
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

  private nodeCount: number;
  private leftTop: Point;
  private rightBottom: Point;
  private readonly BORDER = 20;

  constructor(builder : CoordCalculatorBuilder){
    this.nodeCount = builder.getNodeCount();
    this.leftTop = builder.getLeftTop();
    this.rightBottom = builder.getRightBottom();
  }

  public calculRun(){
    this.BinarySpacePartitioning({ ...this.leftTop }, { ...this.rightBottom }, 1);
  }

  public BinarySpacePartitioning(lt: Point, rb: Point, depth: number) {
    
    if (2 ** depth >= this.nodeCount) {

    }

    const axis = Math.floor(Math.floor(Math.random() * 2));
    const ratio = Math.floor(Math.floor(Math.random() * 4)) + 3; 

    if(axis === 0){
      
    }
    else{

    }
  }
}

export class CoordCalculatorBuilder{

  private nodeCount: number;
  private leftTop: Point;
  private rightBottom: Point;

  public setNodeCount(nodeCount: number){
    this.nodeCount = nodeCount;
    return this;
  }

  public setLeftTop(pt: Point){
    this.leftTop = pt;
    return this;
  }

  public setRightBottom(pt: Point){
    this.rightBottom = pt;
    return this;
  }

  public getNodeCount(){
    return this.nodeCount;
  }

  public getLeftTop(){
    return this.leftTop;
  }

  public getRightBottom(){
    return this.rightBottom;
  }

  public build(){
    return new CoordCalculator(this);
  }
}