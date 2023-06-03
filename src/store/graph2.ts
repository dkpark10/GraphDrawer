import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GraphData } from '@/types/graph';
import { parseGraph } from '@/services/create-graph';

export interface GraphStateDispatcher {
  setGraph: (payload: GraphData) => void;
}

/** @todo 추후에 지우셈 */
const init = parseGraph('6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9') as GraphData;

export const initialState: GraphData = {
  nodes: init?.nodes,
  links: init?.links,
};

const graphStore: StateCreator<GraphData & GraphStateDispatcher> = (set) => ({
  ...initialState,
  setGraph: ({ nodes, links }) => set(() => ({ nodes, links })),
});

export const useGraphStore = create<GraphData & GraphStateDispatcher>()(devtools(graphStore));
