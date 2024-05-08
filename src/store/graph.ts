import { createWithEqualityFn } from 'zustand/traditional';
import { type StateCreator } from 'zustand';
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
  rawInputData: '1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9',
};

export type GraphStoreData = GraphData & GraphStateDispatcher & RawInputData;

const graphStore: StateCreator<GraphStoreData> = (set) => ({
  ...initialState,
  setGraph: ({ nodes, links }, rawInputData) => set(() => ({ nodes, links, rawInputData })),
});

export const useGraphStore = createWithEqualityFn<GraphStoreData>()(devtools(graphStore));
