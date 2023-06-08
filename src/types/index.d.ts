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
    connectedList: Connected;
    coord: Point;
  };

  export interface Size {
    width: number;
    height: number;
  };

  export type AllNumber = { [key: string]: number };

  export type AllString = { [key: string]: string };
}
