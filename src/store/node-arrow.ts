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
