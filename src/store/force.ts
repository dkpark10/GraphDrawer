import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ForceState {
  runForce: boolean;
}

export interface ForceStateDispatcher {
  setRunForce: () => void;
}

const forceState: StateCreator<ForceState & ForceStateDispatcher> = (set) => ({
  runForce: true,
  setRunForce: () => set(({ runForce }) => ({ runForce: !runForce })),
});

export const useRunForce = create<ForceState & ForceStateDispatcher>()(devtools(forceState));
