import axios from 'axios'
import { limiter } from './limiter';

// Definisi tipe untuk parameter fetcher
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
type FetcherParams = Record<string, any>;

// api url
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const animeApiUrl = process.env.NEXT_PUBLIC_API_URL_ANIME_API;

/**
 * Fungsi fetcher umum untuk melakukan permintaan HTTP
 * @param url - URL endpoint
 * @param params - Parameter untuk request
 * @param method - Metode HTTP (get, post, put, delete)
 * @param data - Data untuk body request (untuk post, put)
 * @param headers - Headers tambahan untuk request
 * @returns Promise dengan data respon atau null jika terjadi error
 */
// const fetcher = async (
//   url: string, 
//   params: FetcherParams = {}, 
//   method: HttpMethod = 'get',
//   data?: any,
//   headers?: Record<string, string>
// ) => {
//   try {
//     return await limiter.schedule(async () => {
//       const response = await axios.request({
//         method,
//         url,
//         params,
//         data,
//         headers: {
//           "Content-Type": "application/json",
//           ...headers
//         }
//       });
//       return response.data;
//     });
//   } catch (error) {    
//     console.error('Unexpected fetcher error:', error);
//   }
// };

const fetcher = async (
  url: string, 
  params: FetcherParams = {}, 
  method: HttpMethod = 'get',
  data?: any,
  headers?: Record<string, string>
) => {
  const MAX_RETRY = 3; // Coba ulang maksimal 3 kali
  let attempt = 0;

  while (attempt < MAX_RETRY) {
    try {
      return await limiter.schedule(async () => {
        const response = await axios.request({
          method,
          url,
          params,
          data,
          headers: {
            "Content-Type": "application/json",
            ...headers
          }
        });
        return response.data;
      });
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.warn(`Rate limit exceeded. Retrying attempt ${attempt + 1}...`);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2 detik sebelum retry
        attempt++;
      } else {
        console.error('Unexpected fetcher error:', error);
        throw error; // Throw error jika bukan 429
      }
    }
  }

  throw new Error('Max retry limit reached');
};


// API endpoint functions dari jikan api
export const GetSeasonsNowList = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/seasons/now`, params, 'get');
};

export const GetLatestReview = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/reviews/anime`, params, 'get');
};

export const GetAnimeDetail = async (id:number, params?: FetcherParams) => {
  return fetcher(`${apiUrl}/anime/${id}/full`, params, 'get');
};

export const GetAnimeRecomendations = async (id:number, params?: FetcherParams) => {
  return fetcher(`${apiUrl}/anime/${id}/recommendations`, params, 'get');
};

export const GetAnimeReviews = async (id:number, params?: FetcherParams) => {
  return fetcher(`${apiUrl}/anime/${id}/reviews`, params, 'get');
}

export const GetAnimeCharacter = async (id:number, params?: FetcherParams) => {
  return fetcher(`${apiUrl}/anime/${id}/characters`, params, 'get');
}

export const GetAnimePictures = async (id:number, params?: FetcherParams) => {
  return fetcher(`${apiUrl}/anime/${id}/pictures`, params, 'get');
}

export const GetUpcomingSeasonsAnime = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/seasons/upcoming`, params, 'get');
}

export const GetTopAnime = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/top/anime`, params, 'get');
}

// get anime list according to params, link filter, genre
export const GetAnimeList = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/anime`, params, 'get');
}

export const GetAnimeFromSchedule = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/schedules`, params, 'get');
}

// API endpoint functions dari anime api
export const GetAnimeFromAnimeAPI = async (params?: FetcherParams) => {
  return fetcher(`${animeApiUrl}/search`, params, 'get');
}

export const GetAnimeEpisodesFromAnimeAPI = async (id:string, params?: FetcherParams) => {
  return fetcher(`${animeApiUrl}/episodes/${id}`, params, 'get');
}

export const GetAnimeEpisodesServer = async (params?: FetcherParams) => {
  return fetcher(`${animeApiUrl}/servers`, params, 'get');
}

export const GetAnimeStreamingResource = async (params?: FetcherParams) => {
  return fetcher(`${animeApiUrl}/episode-srcs`, params, 'get');
}