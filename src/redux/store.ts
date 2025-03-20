import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// sliices
import utilityReducer from './slice/utilitySlice';
import animeReducer from './slice/animeSlice';
import filterReducer from './slice/filterSlice';
import alertReducer from './slice/alert';
import watchlistReducer from './slice/watchlist';
import authReducer from './slice/auth';
import historyReducer from './slice/history';

const persistConfig = {
  key: 'root',
  storage,
};

const perisestedAnimeReducer = persistReducer(persistConfig, animeReducer);
const persistedFilterReducer = persistReducer(persistConfig, filterReducer);
const persistedWatchlistReducer = persistReducer(persistConfig, watchlistReducer);
const persistedHistoryReducer = persistReducer(persistConfig, historyReducer);

export const store = configureStore({
  reducer: {
    utility: utilityReducer,
    anime: perisestedAnimeReducer,
    filter: persistedFilterReducer,
    alert: alertReducer,
    watchlist: persistedWatchlistReducer,
    auth: authReducer,
    history: persistedHistoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
      // Abaikan pengecekan serializable untuk action-action redux-persist berikut
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, 
  RootState, 
  unknown, 
  Action<string>
>;

export const persistor = persistStore(store);

// custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector