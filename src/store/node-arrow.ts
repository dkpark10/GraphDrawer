import { create } from 'zustand';

export interface ArrowState {
  isArrow: boolean;
}

export interface ArrowStateDispatcher {
  setArrowDirect: () => void;
}

export const useArrowStore = create<ArrowState & ArrowStateDispatcher>((set) => ({
  isArrow: false,
  setArrowDirect: () => set(({ isArrow }) => ({ isArrow: !isArrow })),
}));
