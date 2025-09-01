import axios, { AxiosError } from 'axios';
import { limiter } from '@/lib/limiter';

// Definisi tipe untuk parameter fetcher
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
type FetcherParams = Record<string, any>;

// api url
const jikanApiUrl = process.env.NEXT_PUBLIC_JIKAN_API;
const animeRunawayApiUrl = process.env.NEXT_PUBLIC_ANIMERUNAWAY_API;

/**
 * Fungsi fetcher umum untuk melakukan permintaan HTTP
 * @param url - URL endpoint
 * @param params - Parameter untuk request
 * @param method - Metode HTTP (get, post, put, delete)
 * @param data - Data untuk body request (untuk post, put)
 * @param headers - Headers tambahan untuk request
 * @returns Promise dengan data respon atau null jika terjadi error
 */

export const testNetwork = async () => {
  const testUrls = [
    'https://api.jikan.moe/v4',
    'https://httpbin.org/get',
    'https://jsonplaceholder.typicode.com/posts/1'
  ];

  for (const testUrl of testUrls) {
    try {
      console.log(`Testing: ${testUrl}`);
      const start = Date.now();
      const response = await axios.get(testUrl, { timeout: 10000 });
      const duration = Date.now() - start;
      console.log(`✅ Success: ${testUrl} (${duration}ms, status: ${response.status})`);
    } catch (error: any) {
      console.error(`❌ Failed: ${testUrl} - ${error.message}`);
      if (error.code) console.log(`Error code: ${error.code}`);
    }
  }
};

const fetcher = async (
  url: string, 
  params: FetcherParams = {}, 
  method: HttpMethod = 'get',
  data?: any,
  headers?: Record<string, string>
) => {
  const MAX_RETRY = 3;
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
          },
          // Konfigurasi timeout yang lebih agresif
          timeout: 15000, // 15 detik timeout
          // Retry configuration untuk network issues
          validateStatus: (status) => status >= 200 && status < 300,
        });
        return response.data;
      });
    } catch (error: any) {
      const axiosError = error as AxiosError;
      
      // Log error untuk debugging
      console.error(`Attempt ${attempt + 1} failed:`, {
        url,
        status: axiosError.response?.status,
        code: axiosError.code,
        message: axiosError.message,
        timeout: axiosError.code === 'ETIMEDOUT' || axiosError.code === 'ECONNABORTED'
      });

      // Handle different error types
      if (axiosError.response?.status === 429) {
        console.warn(`Rate limit exceeded. Retrying attempt ${attempt + 1}...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        attempt++;
      } else if (axiosError.code === 'ETIMEDOUT' || axiosError.code === 'ECONNABORTED') {
        console.warn(`Request timeout. Retrying attempt ${attempt + 1}...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempt++;
      } else if (axiosError.code === 'ENOTFOUND' || axiosError.code === 'ECONNREFUSED') {
        console.error('Network connectivity issue:', axiosError.code);
        throw new Error(`Network error: ${axiosError.code}. Please check your internet connection.`);
      } else if (axiosError.response?.status === 404) {
        throw new Error(`Resource not found (404): ${url}`);
      } else if (axiosError?.response && axiosError?.response?.status >= 500) {
        console.warn(`Server error (${axiosError?.response?.status}). Retrying attempt ${attempt + 1}...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        attempt++;
      } else {
        console.error('Unexpected fetcher error:', axiosError);
        throw axiosError;
      }
    }
  }

  throw new Error(`Max retry limit reached for ${url}`);
};

// API endpoint functions dari jikan api
export const GetSeasonsNowList = async (params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/seasons/now`, params, 'get');
};

export const GetLatestReview = async (params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/reviews/anime`, params, 'get');
};

export const GetAnimeDetail = async (id:number, params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/anime/${id}/full`, params, 'get');
};

export const GetAnimeRecomendations = async (id:number, params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/anime/${id}/recommendations`, params, 'get');
};

export const GetAnimeReviews = async (id:number, params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/anime/${id}/reviews`, params, 'get');
}

export const GetAnimeCharacter = async (id:number, params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/anime/${id}/characters`, params, 'get');
}

export const GetAnimePictures = async (id:number, params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/anime/${id}/pictures`, params, 'get');
}

export const GetUpcomingSeasonsAnime = async (params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/seasons/upcoming`, params, 'get');
}

export const GetTopAnime = async (params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/top/anime`, params, 'get');
}

// get anime list according to params, link filter, genre
export const GetAnimeList = async (params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/anime`, params, 'get');
}

export const GetAnimeFromSchedule = async (params?: FetcherParams) => {
  return fetcher(`${jikanApiUrl}/schedules`, params, 'get');
}

// API endpoint functions dari animeRunaway api
export const GetAnimeFromAnimeAPI = async (params?: FetcherParams) => {
  return fetcher(`${animeRunawayApiUrl}/search`, params, 'get');
}

export const GetAnimeEpisodesFromAnimeAPI = async (id:string, params?: FetcherParams) => {
  return fetcher(`${animeRunawayApiUrl}/episodes/${id}`, params, 'get');
}

export const GetAnimeEpisodesServer = async (params?: FetcherParams) => {
  return fetcher(`${animeRunawayApiUrl}/servers`, params, 'get');
}

export const GetAnimeStreamingResource = async (params?: FetcherParams) => {
  return fetcher(`${animeRunawayApiUrl}/episode-srcs`, params, 'get');
}