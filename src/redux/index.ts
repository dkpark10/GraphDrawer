export const SETGRAPHINFO = 'SETGRAPHINFO' as const;

export interface Graph {
  nodeCount: string;
  edgeCount: string;
  graph: { [key: string]: string[][] };
}

export interface State {
  graph: Graph;
};

interface Action {
  type: string;
  payload: Graph;
}

const initialState: State = {
  graph: {
    nodeCount: '',
    edgeCount: '',
    graph: {}
  }
};

// action creator
export const setGraphInfo = (diff: Graph) => ({
  type: SETGRAPHINFO,
  payload: diff
});

// 리듀서
export default function gameReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case SETGRAPHINFO:
      return {
        ...state,
        graph: action.payload
      }
    default:
      return state;
  }
}
