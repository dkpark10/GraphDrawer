import { createWithEqualityFn } from 'zustand/traditional';
import { type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ShortestPathState {
  from: string;
  to: string;
  shortestPath: Array<string>;
}

export interface ShortestPathStateDispatcher {
  setShortestPath: (payload: ShortestPathState) => void;
}

export const shortestPathInitState: ShortestPathState = {
  from: '',
  to: '',
  shortestPath: [],
};

const shortestPathStore: StateCreator<ShortestPathState & ShortestPathStateDispatcher> = (set) => ({
  ...shortestPathInitState,
  setShortestPath: ({ from, to, shortestPath }) => set(() => ({ from, to, shortestPath })),
});

export const useShortestPathStore = createWithEqualityFn<ShortestPathState & ShortestPathStateDispatcher>()(
  devtools(shortestPathStore),
);
