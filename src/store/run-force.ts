import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface RunForceState {
  runForce: boolean;
  setRunForce: () => void;
}

const runForceState: StateCreator<RunForceState> = (set) => ({
  runForce: false,
  setRunForce: () => set(({ runForce }) => ({ runForce: !runForce })),
});

export const useRunForce = create<RunForceState>()(devtools(runForceState));
