import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UtilityState {
  showMoreSynopsis: {
    display: boolean,
    data: string
  };
  showReview: {
    display: boolean,
    data: any | null
  };
  showAnimePictures: {
    display: boolean,
    data: any | null
  };
  searchParam: string;
  profileButtonClick: boolean;
  mobileNavClick: boolean;
}

const initialState: UtilityState = {
  showMoreSynopsis: {
    display: false,
    data: ''
  },
  showReview: {
    display: false,
    data: null
  },
  showAnimePictures: {
    display: false,
    data: null
  },
  searchParam: '',
  profileButtonClick: false,
  mobileNavClick: false,
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setShowMoreSynopsis: (state, action:PayloadAction<{display: boolean, data:string}>) => {
      state.showMoreSynopsis = {
        display: action.payload.display,
        data: action.payload.data
      }
    },
    setShowReview: (state, action:PayloadAction<{display: boolean, data:any | null}>) => {
      state.showReview = {
        display: action.payload.display,
        data: action.payload.data
      }
    },
    setShowAnimePicture: (state, action:PayloadAction<{display: boolean, data:any | null}>) => {
      state.showAnimePictures = {
        display: action.payload.display,
        data: action.payload.data
      }
    },
    setSearchParam: (state, action:PayloadAction<string>) => {
      state.searchParam = action.payload
    },
    setProfileButtonClick: (state, action:PayloadAction<boolean>) => {
      state.profileButtonClick = action.payload
    },
    setMobileNavClick: (state, action:PayloadAction<boolean>) => {
      state.mobileNavClick = action.payload
    },
  },
});

export const {
  setShowMoreSynopsis,
  setShowReview,
  setShowAnimePicture,
  setSearchParam,
  setProfileButtonClick,
  setMobileNavClick
} = utilitySlice.actions;
export default utilitySlice.reducer