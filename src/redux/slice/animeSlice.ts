import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Tipe EpisodeProps & EpisodeList
type EpisodeProps = {
  name: string;
  episodeNo: number;
  episodeId: string;
  filler: boolean;
};

interface EpisodeList {
  totalEpisode: number;
  episodes: EpisodeProps[];
}

// Tipe khusus untuk server sub & dub
interface AnimeEpisodeServerState {
  category: string;
  serverName: string;
}

// Tipe state utama
interface AnimeState {
  animeEpisodeList: EpisodeList;
  animeEpisodeCover: string;
  animeEpisodeServer: AnimeEpisodeServerState;
  currentPlayAnime: {
    id: number | any;
    title: string | any;
    slug: string | any;
    cover: string
  }
}

// State awal
const initialState: AnimeState = {
  animeEpisodeList: {
    totalEpisode: 0,
    episodes: [],
  },
  animeEpisodeCover: '',
  animeEpisodeServer: {
    category: 'sub',
    serverName: 'vidsrc',
  },
  currentPlayAnime: {
    id: 0,
    title: '',
    slug: '',
    cover: '',
  }
};

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setAnimeEpisodeList: (
      state,
      action: PayloadAction<{ totalEpisode: number; episodes: EpisodeProps[] }>
    ) => {
      state.animeEpisodeList = {
        totalEpisode: action.payload.totalEpisode,
        episodes: action.payload.episodes,
      };
    },
    setAnimeEpisodeCover: (state, action: PayloadAction<string>) => {
      state.animeEpisodeCover = action.payload;
    },
    setAnimeEpisodeServer: (state, action: PayloadAction<{category: 'sub' | 'dub', serverName: string;}>) => {
      state.animeEpisodeServer = {
        category: action.payload.category,
        serverName: action.payload.serverName
      };
    },
    setCurrentPlayAnime: (state, action: PayloadAction<{id:number, title:string, slug:string, cover:string}>) => {
      const {id, title, slug, cover} = action.payload
      state.currentPlayAnime = {id, title, slug, cover};
    }
  },
});

export const {
  setAnimeEpisodeList,
  setAnimeEpisodeCover,
  setAnimeEpisodeServer,
  setCurrentPlayAnime
} = animeSlice.actions;
export default animeSlice.reducer;
