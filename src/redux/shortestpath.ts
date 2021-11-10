export const SETSHORTESTPATH = 'SETSHORTESTPATH' as const;

export interface ShortestPathState {
  from : string;
  to: string;
  path: { [key: string]: boolean };
}

interface Action {
  type: string;
  payload: ShortestPathState;
}

export const initialState: ShortestPathState = {
  from: '',
  to: '',
  path: {}
};

// action creator
export const setShortestPath = (diff: ShortestPathState) => ({
  type: SETSHORTESTPATH,
  payload: diff
});

// 리듀서
export default function shortestPathReducer(state: ShortestPathState = initialState, action: Action): ShortestPathState {
  switch (action.type) {
    case SETSHORTESTPATH:
      return {
        ...state,
        from : action.payload.from,
        to : action.payload.to,
        path: action.payload.path
      }
    default:
      return state;
  }
}