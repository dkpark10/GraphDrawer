/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GraphState {
  vertexCount: string;
  edgeCount: string;
  graph: { [key: string]: string[][] };
}

export const initialState: GraphState = {
  vertexCount: '0',
  edgeCount: '',
  graph: {},
};

export const graphReducer = createSlice({
  name: 'graph-reducer',
  initialState,
  reducers: {
    setGraph(state, action: PayloadAction<GraphState>) {
      state.vertexCount = action.payload.vertexCount;
      state.edgeCount = action.payload.edgeCount;
      state.graph = action.payload.graph;
    },
  },
});

export const { setGraph } = graphReducer.actions;
