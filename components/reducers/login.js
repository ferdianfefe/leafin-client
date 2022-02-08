import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setLogin } = slice.actions;

export default slice.reducer;
