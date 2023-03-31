import { configureStore } from '@reduxjs/toolkit';
import { graphReducer } from './graph';
import { arrowDirectReducer } from './node-arrow';
import { shortestPathReducer } from './shortestpath';

export const store = configureStore({
  reducer: {
    arrowDirect: arrowDirectReducer.reducer,
    graph: graphReducer.reducer,
    shortestPath: shortestPathReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
