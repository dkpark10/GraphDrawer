import { combineReducers } from 'redux';
import graphReducer, { GraphState } from './graph';
import directReducer, { DirectState } from './direct';
import shortestPathReducer, { ShortestPathState } from './shortestpath';

export interface RootState {
  graph : GraphState,
  direct : DirectState,
  path : ShortestPathState
}

export default combineReducers<RootState>({
  graph: graphReducer,
  direct: directReducer,
  path: shortestPathReducer
});

