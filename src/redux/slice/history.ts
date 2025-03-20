import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type animeData = {
  id: number,
  title: string,
  slug: string,
  cover: string,
  episode?: {
    episodeId: string,
    episodeNo: number,
    filler: boolean,
    name:string
  }
}

interface UserHistory {
  userId: string | number;
  userHistory: animeData[];
}

interface HistoryState {
  history: UserHistory[];
}

const initialState: HistoryState = {
  history: []
};

const HistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // Inisialisasi history user jika belum ada
    initUserHistory: (state, action: PayloadAction<string | number>) => {
      const userId = action.payload;
      const exists = state.history.find(item => item.userId === userId);
      if (!exists) {
        state.history.push({ userId, userHistory: [] });
      }
    },
    // Tambahkan anime ke userHistory user tertentu
    addToHistory: (state, action: PayloadAction<{ userId: string | number; anime: animeData }>) => {
      const { userId, anime } = action.payload;
      // Cari userHistory untuk user tersebut
      let userHistory = state.history.find(item => item.userId === userId);

      // Jika userHistory belum ada, inisialisasi terlebih dahulu
      if (!userHistory) {
        userHistory = { userId, userHistory: [] };
        state.history.push(userHistory);
      }

      // Cek apakah anime sudah ada di dalam userHistory
      const alreadyIn = userHistory.userHistory.find(item => item.id === anime.id);
      if (!alreadyIn) {
        userHistory.userHistory.push(anime);
      }
      // Jika sudah ada, sebaiknya alert dipicu di luar reducer
    },
    // Hapus anime dari userHistory berdasarkan animeId untuk user tertentu
    removeFromUserHistory: (state, action: PayloadAction<{ userId: string | number; animeId: number }>) => {
      const { userId, animeId } = action.payload;
      const userHistory = state.history.find(item => item.userId === userId);
      if (userHistory) {
        userHistory.userHistory = userHistory.userHistory.filter(anime => anime.id !== animeId);
      }
    }
  }
});

export const { initUserHistory, addToHistory, removeFromUserHistory } = HistorySlice.actions;
export default HistorySlice.reducer;