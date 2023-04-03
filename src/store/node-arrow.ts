/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface State {
  isArrow: boolean;
}

export const initialState: State = {
  isArrow: false,
};

export const arrowDirectReducer = createSlice({
  name: 'arrow-reducer',
  initialState,
  reducers: {
    setArrowDirect: (state) => {
      state.isArrow = !state.isArrow;
    },
  },
});

export const { setArrowDirect } = arrowDirectReducer.actions;
