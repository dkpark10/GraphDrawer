export const SETDIRECT = 'SETDIRECT' as const;

export interface DirectState {
  directed: boolean;
}

interface Action {
  type: string;
  payload: boolean;
}

const initialState: DirectState = {
  directed: false
};

export const setDirected = (diff: boolean) => ({
  type: SETDIRECT,
  payload: diff
});

// 리듀서
export default function directReducer(state: DirectState = initialState, action: Action): DirectState {
  switch (action.type) {
    case SETDIRECT:
      return {
        ...state,
        directed : action.payload
      }
    default:
      return state;
  }
}