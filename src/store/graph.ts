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
  rawInputData: '',
};

export type GraphStoreData = GraphData & GraphStateDispatcher & RawInputData;

const graphStore: StateCreator<GraphStoreData> = (set) => ({
  ...initialState,
  setGraph: ({ nodes, links }, rawInputData) => set(() => ({ nodes, links, rawInputData })),
});

export const useGraphStore = createWithEqualityFn<GraphStoreData>()(devtools(graphStore));
