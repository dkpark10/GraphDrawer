import { combineReducers } from 'redux';
import graphReducer, { GraphState } from './graph';
import directReducer, { DirectState } from './direct';

export interface RootState {
  graph : GraphState,
  direct : DirectState
}

export default combineReducers<RootState>({
  graph: graphReducer,
  direct: directReducer
});

