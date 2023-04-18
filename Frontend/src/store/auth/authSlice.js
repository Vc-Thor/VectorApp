import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated',
    uid: null,
    email: null,
    name: null,
    role: null,
    errorMessage: null,
    token: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.name = payload.name;
      state.role = payload.role;
      state.errorMessage = null;
      state.token = payload.token;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.name = null;
      state.role = null;
      state.errorMessage = payload?.errorMessage;
      state.token = null;
    },
    checkinCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkinCredentials } = authSlice.actions;
