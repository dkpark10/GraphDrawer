import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ShortestPathState {
  from: string;
  to: string;
  path: { [key: string]: boolean };
}

export interface ShortestPathStateDispatcher {
  setShortestPath: (payload: ShortestPathState) => void;
}

const shortestPathStore: StateCreator<ShortestPathState & ShortestPathStateDispatcher> = (set) => ({
  from: '',
  to: '',
  path: {},
  setShortestPath: ({ from, to, path }) => set(() => ({ from, to, path })),
});

export const useShortestPathStore = create<ShortestPathState & ShortestPathStateDispatcher>()(
  devtools(shortestPathStore),
);
