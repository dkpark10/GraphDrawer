/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  from: string;
  to: string;
  path: { [key: string]: boolean };
}

export const initialState: State = {
  from: '',
  to: '',
  path: {},
};

export const shortestPathReducer = createSlice({
  name: 'shortest-path-reducer',
  initialState,
  reducers: {
    setShortestPath: (state, { payload: { from, to, path } }: PayloadAction<State>) => {
      state.from = from;
      state.to = to;
      state.path = path;
    },
  },
});

export const { setShortestPath } = shortestPathReducer.actions;
