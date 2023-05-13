import { create } from 'zustand';
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

export const useGraphStore = create<GraphState & GraphStateDispatcher>((set) => ({
  ...initialState,
  setGraph: ({ vertexCount, graph }) => set(() => ({ vertexCount, graph })),
}));
