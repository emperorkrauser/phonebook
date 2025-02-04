import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  isLogout: true,
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
    isLogout: (state, action) => {
      state.isLogout = action.payload;
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

export const { isLogin, isLogout, isToRegister, storeUser, authError } =
  authSlice.actions;
