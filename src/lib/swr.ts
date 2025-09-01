'use client'

import useSWR from 'swr'
import { limiter } from './limiter';
import axios from 'axios';

// Unified fetcher dengan retry logic
const fetcher = async (url: string) => {
  const MAX_RETRY = 3;
  let attempt = 0;

  while (attempt < MAX_RETRY) {
    try {
      return await limiter.schedule(async () => {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 10000 // 10 second timeout
        });
        return response.data;
      });
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.warn(`Rate limit exceeded. Retrying attempt ${attempt + 1}...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        attempt++;
      } else if (error.response?.status === 404) {
        console.error('Resource not found (404):', url);
        throw new Error(`Resource not found: ${url}`);
      } else {
        console.error('Fetcher error:', {
          url,
          status: error.response?.status,
          message: error.message,
          response: error.response?.data
        });
        throw error;
      }
    }
  }

  throw new Error('Max retry limit reached');
};

export const useSWRCaching = (url?: string, initialData?: any) => {
  // Debugging: log the full URL
  const fullUrl = url ? `${process.env.NEXT_PUBLIC_JIKAN_API}${url}` : null;
  
  console.log('SWR URL:', fullUrl);
  console.log('JIKAN_API:', process.env.NEXT_PUBLIC_JIKAN_API);
  
  const { data, isLoading, error } = useSWR(
    fullUrl,
    fetcher,
    {
      fallbackData: initialData,
      dedupingInterval: 60000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      // Add error retry config
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      // Add revalidation config
      refreshInterval: 0, // Don't auto refresh
      shouldRetryOnError: (error) => {
        // Don't retry on 404
        if (error?.message?.includes('404') || error?.response?.status === 404) {
          return false;
        }
        return true;
      }
    }
  )

  return { data, isLoading, error };
}

export const useSWRCachingAnimeApi = (url?: string, initialData?: any) => {
  const fullUrl = url ? `${process.env.NEXT_PUBLIC_ANIMERUNAWAY_API}${url}` : null;
  
  console.log('SWR Anime API URL:', fullUrl);
  console.log('ANIMERUNAWAY_API:', process.env.NEXT_PUBLIC_ANIMERUNAWAY_API);
  
  const { data, isLoading, error } = useSWR(
    fullUrl,
    fetcher,
    {
      fallbackData: initialData,
      dedupingInterval: 60000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      refreshInterval: 0,
      shouldRetryOnError: (error) => {
        if (error?.message?.includes('404') || error?.response?.status === 404) {
          return false;
        }
        return true;
      }
    }
  )

  return { data, isLoading, error };
}