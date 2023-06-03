import type { SimulationNodeDatum, SimulationLinkDatum, Datum } from 'd3-force';

export interface Size {
  width: number;
  height: number;
}

export interface Node {
  id: ReactText;
}

export type Edge = { cost?: string } & SimulationLinkDatum<SimulationNodeDatum>;

export interface GraphData {
  nodes: Array<Node>;
  links: Array<Edge>;
}

export type AttrType = null | string | number | boolean | ReadonlyArray<string | number> | ValueFn<GElement, Datum, null | string | number | boolean | ReadonlyArray<string | number>>;
