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

// Test basic connectivity
export const testConnectivity = async () => {
  const tests = [
    'https://httpbin.org/get',
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://api.jikan.moe/v4'
  ];
  
  for (const testUrl of tests) {
    try {
      const response = await fetch(testUrl, { 
        signal: AbortSignal.timeout(5000) 
      });
      console.log(`✓ ${testUrl}: ${response.status}`);
      return true;
    } catch (error) {
      console.error(`✗ ${testUrl}:`, error);
    }
  }
  return false;
};

// Simple fetcher without rate limiter
const simpleFetcher = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'anime-paradise/1.0',
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout after 8 seconds');
    }
    throw error;
  }
};

// Axios fetcher with optimized config
const axiosFetcher = async (url: string) => {
  return await axios.get(url, {
    timeout: 8000,
    headers: {
      'User-Agent': 'anime-paradise/1.0',
      'Accept': 'application/json',
    },
    // Axios specific configurations
    maxRedirects: 5,
    validateStatus: (status) => status >= 200 && status < 300,
  }).then(res => res.data);
};

// Rate limited fetcher
const rateLimitedFetcher = async (url: string) => {
  return await limiter.schedule(async () => {
    return await axiosFetcher(url);
  });
};

// Main fetcher with multiple strategies
const fetcher = async (
  url: string, 
  params: FetcherParams = {}, 
  method: HttpMethod = 'get',
  data?: any,
  headers?: Record<string, string>
) => {
  const MAX_RETRY = 3;
  let attempt = 0;

  // Construct URL dengan params untuk GET requests
  let finalUrl = url;
  if (method === 'get' && params && Object.keys(params).length > 0) {
    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
    finalUrl = urlObj.toString();
  }

  console.log(`Fetching: ${finalUrl}`);

  while (attempt < MAX_RETRY) {
    try {
      return await limiter.schedule(async () => {
        const axiosConfig: any = {
          method,
          url: finalUrl,
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "anime-paradise/1.0",
            ...headers
          },
          timeout: 12000, // 12 detik timeout
          validateStatus: (status: number) => status >= 200 && status < 300,
        };

        // Untuk non-GET requests, gunakan params dan data sesuai kebutuhan
        if (method !== 'get') {
          if (data) axiosConfig.data = data;
          if (params && Object.keys(params).length > 0) {
            axiosConfig.params = params;
          }
        }

        const response = await axios.request(axiosConfig);
        return response.data;
      });
    } catch (error: any) {
      const axiosError = error as AxiosError;
      
      console.error(`Attempt ${attempt + 1} failed:`, {
        url: finalUrl,
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
        // Increase delay for timeout retries
        await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
        attempt++;
      } else if (axiosError.code === 'ENOTFOUND' || axiosError.code === 'ECONNREFUSED') {
        console.error('Network connectivity issue:', axiosError.code);
        throw new Error(`Network error: ${axiosError.code}. Please check your internet connection.`);
      } else if (axiosError.response?.status === 404) {
        throw new Error(`Resource not found (404): ${finalUrl}`);
      } else if (axiosError.response?.status && axiosError.response.status >= 500) {
        console.warn(`Server error (${axiosError.response.status}). Retrying attempt ${attempt + 1}...`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        attempt++;
      } else {
        console.error('Unexpected fetcher error:', axiosError);
        throw axiosError;
      }
    }
  }

  throw new Error(`Max retry limit reached for ${finalUrl}`);
};

export const testNetwork = async () => {
  return await testConnectivity();
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