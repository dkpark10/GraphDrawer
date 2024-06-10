import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ArrowState {
  isArrow: boolean;
  setArrowDirect: () => void;
}

const arrowStore: StateCreator<ArrowState> = (set) => ({
  isArrow: false,
  setArrowDirect: () => set(({ isArrow }) => ({ isArrow: !isArrow })),
});

export const useArrowStore = create<ArrowState>()(devtools(arrowStore));
