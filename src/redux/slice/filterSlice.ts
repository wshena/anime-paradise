import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  popularFilter: {
    type?: string,
    filter?: string,
  }
}

const initialState: FilterState = {
  popularFilter: {
    type: '',
    filter: '',
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPopularFilter: (state, action:PayloadAction<{type?:string, filter?:string}>) => {
      const {type, filter} = action.payload;
      state.popularFilter = {type, filter}
    },
  },
});

export const {
  setPopularFilter
} = filterSlice.actions;
export default filterSlice.reducer