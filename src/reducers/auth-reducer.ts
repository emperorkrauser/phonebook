import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  isToRegister: false,
  user: {},
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.isAuth = action.payload;
    },
    isToRegister: (state, action) => {
      state.isToRegister = action.payload;
    },
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    authError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { isLogin, isToRegister, storeUser, authError } =
  authSlice.actions;
