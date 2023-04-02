declare module 'global-type' {
  export interface Point {
    y: number;
    x: number;
  };

  export type Connected = Array<{ vertex: string; cost: string }>;

  export interface ConnectedInfo {
    [key: string]: Connected;
  };

  export interface Vertex {
    connectedList: string[][];
    coord: Point;
  };
}
