import graphReducer, { GraphState } from './graph';
import { arrowDirectReducer } from './node-arrow';
import shortestPathReducer, { ShortestPathState } from './shortestpath';

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    arrowDirect: arrowDirectReducer.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;









import { createSlice } from '@reduxjs/toolkit'

interface State {
  isArrow: boolean;
}

const initialState: State = {
  isArrow: false,
};

export const arrowDirectReducer = createSlice({
  name: 'arrow-reducer',
  initialState,
  reducers: {
    setArrowDirect: (state) => {
      state.isArrow = !state.isArrow
    },   
  }
})

export const { setArrowDirect } = arrowDirectReducer.actions;
