import type { SimulationNodeDatum, SimulationLinkDatum, Datum } from 'd3-force';

export interface Size {
  width: number;
  height: number;
}

export interface Vertex {
  value: string;
}

export type Edge = { cost?: string } & SimulationLinkDatum<SimulationNodeDatum>;

export interface GraphData {
  nodes: Array<Vertex>;
  links: Array<Edge>;
}

export type AttrType = null | string | number | boolean | ReadonlyArray<string | number> | ValueFn<GElement, Datum, null | string | number | boolean | ReadonlyArray<string | number>>;
