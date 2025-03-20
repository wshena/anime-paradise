import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  alert: {
    label: string,
    message?: string,
    type: 'success' | 'error' | 'warning' | 'info'
  }
}

const initialState: AlertState = {
  alert: {
    label: '',
    message: '',
    type: 'info'
  }
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action:PayloadAction<{label:string, message?:string, type: 'success' | 'error' | 'warning' | 'info' }>) => {
      const {label, message, type} = action.payload;
      state.alert = {label, message, type}
    },
  },
});

export const {
  setAlert
} = alertSlice.actions;
export default alertSlice.reducer