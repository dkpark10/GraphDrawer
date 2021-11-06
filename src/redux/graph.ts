export const SETGRAPHINFO = 'SETGRAPHINFO' as const;

export interface Graph {
  vertexCount: string;
  edgeCount: string;
  graph: { [key: string]: string[][] };
}

export interface GraphState {
  graph: Graph;
};

interface Action {
  type: string;
  payload: Graph;
}

const initialState: GraphState = {
  graph: {
    vertexCount: '0',
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
export default function graphReducer(state: GraphState = initialState, action: Action): GraphState {
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