import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  session: any;
}

const initialState: AuthState = {
  user: {},
  session: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.session = null;
    }
  },
});

export const {
  setUser,
  setSession,
  logoutUser
} = authSlice.actions;

export default authSlice.reducer;