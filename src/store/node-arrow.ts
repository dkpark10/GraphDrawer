import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ArrowState {
  isArrow: boolean;
}

export interface ArrowStateDispatcher {
  setArrowDirect: () => void;
}

const arrowStore: StateCreator<ArrowState & ArrowStateDispatcher> = (set) => ({
  isArrow: false,
  setArrowDirect: () => set(({ isArrow }) => ({ isArrow: !isArrow })),
});

export const useArrowStore = create<ArrowState & ArrowStateDispatcher>()(devtools(arrowStore));
