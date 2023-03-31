/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  graph: {
    vertexCount: string;
    edgeCount: string;
    graph: { [key: string]: string[][] };
  };
}

const initialState: State = {
  graph: {
    vertexCount: '0',
    edgeCount: '',
    graph: {},
  },
};

export const graphReducer = createSlice({
  name: 'graph-reducer',
  initialState,
  reducers: {
    setGraph(state, action: PayloadAction<State>) {
      state.graph = action.payload.graph;
    },
  },
});

export const { setGraph } = graphReducer.actions;
