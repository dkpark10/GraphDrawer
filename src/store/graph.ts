import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ConnectedInfo } from 'global-type';

export interface GraphState {
  vertexCount: string;
  graph: ConnectedInfo;
}

export interface GraphStateDispatcher {
  setGraph: (payload: GraphState) => void;
}

export const initialState: GraphState = {
  vertexCount: '0',
  graph: {},
};

const graphStore: StateCreator<GraphState & GraphStateDispatcher> = (set) => ({
  ...initialState,
  setGraph: ({ vertexCount, graph }) => set(() => ({ vertexCount, graph })),
});

export const useGraphStore = create<GraphState & GraphStateDispatcher>()(devtools(graphStore));
