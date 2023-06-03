import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GraphData } from '@/types/graph';

export interface GraphStateDispatcher {
  setGraph: (payload: GraphData) => void;
}

export const initialState: GraphData = {
  nodes: [],
  links: [],
};

const graphStore: StateCreator<GraphData & GraphStateDispatcher> = (set) => ({
  ...initialState,
  setGraph: ({ nodes, links }) => set(() => ({ nodes, links })),
});

export const useGraphStore = create<GraphData & GraphStateDispatcher>()(devtools(graphStore));
