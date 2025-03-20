import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserWatchlist {
  userId: string | number;
  userWatchlist: any[];
}

interface WatchlistState {
  watchlist: UserWatchlist[];
}

const initialState: WatchlistState = {
  watchlist: []
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    // Inisialisasi watchlist user jika belum ada
    initUserWatchlist: (state, action: PayloadAction<string | number>) => {
      const userId = action.payload;
      const exists = state.watchlist.find(item => item.userId === userId);
      if (!exists) {
        state.watchlist.push({ userId, userWatchlist: [] });
      }
    },
    // Tambahkan anime ke watchlist user tertentu
    addToWatchlist: (state, action: PayloadAction<{ userId: string | number; anime: any }>) => {
      const { userId, anime } = action.payload;
      // Cari watchlist untuk user tersebut
      let userWatchlist = state.watchlist.find(item => item.userId === userId);

      // Jika watchlist belum ada, inisialisasi terlebih dahulu
      if (!userWatchlist) {
        userWatchlist = { userId, userWatchlist: [] };
        state.watchlist.push(userWatchlist);
      }

      // Cek apakah anime sudah ada di dalam watchlist
      const alreadyIn = userWatchlist.userWatchlist.find(item => item.mal_id === anime.mal_id);
      if (!alreadyIn) {
        userWatchlist.userWatchlist.push(anime);
      }
      // Jika sudah ada, sebaiknya alert dipicu di luar reducer
    },
    // Hapus anime dari watchlist berdasarkan animeId untuk user tertentu
    removeFromWatchlist: (state, action: PayloadAction<{ userId: string | number; animeId: number }>) => {
      const { userId, animeId } = action.payload;
      const userWatchlist = state.watchlist.find(item => item.userId === userId);
      if (userWatchlist) {
        userWatchlist.userWatchlist = userWatchlist.userWatchlist.filter(anime => anime.mal_id !== animeId);
      }
    }
  }
});

export const { initUserWatchlist, addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;