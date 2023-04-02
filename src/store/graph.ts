/* eslint-disable no-param-reassign */
import { ConnectedInfo } from 'global-type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GraphState {
  vertexCount: string;
  graph: ConnectedInfo;
}

export const initialState: GraphState = {
  vertexCount: '0',
  graph: {},
};

export const graphReducer = createSlice({
  name: 'graph-reducer',
  initialState,
  reducers: {
    setGraph(state, action: PayloadAction<GraphState>) {
      state.vertexCount = action.payload.vertexCount;
      state.graph = action.payload.graph;
    },
  },
});

export const { setGraph } = graphReducer.actions;
