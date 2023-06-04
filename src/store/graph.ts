// import { create, type StateCreator } from 'zustand';
// import { devtools } from 'zustand/middleware';
// import { ConnectedInfo } from 'global-type';

// export interface GraphState {
//   vertexCount: string;
//   graph: ConnectedInfo;
// }

// export interface GraphStateDispatcher {
//   setGraph: (payload: GraphState) => void;
// }

// export const initialState: GraphState = {
//   vertexCount: '0',
//   graph: {},
// };

// const graphStore: StateCreator<GraphState & GraphStateDispatcher> = (set) => ({
//   ...initialState,
//   setGraph: ({ vertexCount, graph }) => set(() => ({ vertexCount, graph })),
// });

// export const useGraphStore = create<GraphState & GraphStateDispatcher>()(devtools(graphStore));

import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GraphData } from '@/types/graph';

export interface RawInputData {
  rawInputData: string;
}

export interface GraphStateDispatcher {
  setGraph: (payload: GraphData, rawInputData: string) => void;
}

export const initialState: GraphData & RawInputData = {
  nodes: [],
  links: [],
  rawInputData: '',
};

export type GraphStoreData = GraphData & GraphStateDispatcher & RawInputData;

const graphStore: StateCreator<GraphStoreData> = (set) => ({
  ...initialState,
  setGraph: ({ nodes, links }, rawInputData) => set(() => ({ nodes, links, rawInputData })),
});

export const useGraphStore = create<GraphStoreData>()(devtools(graphStore));
