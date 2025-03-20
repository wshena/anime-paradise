'use client'

import useSWR from 'swr'
import { limiter } from './limiter';

const fetcher = (url: string, options?: RequestInit) =>
  limiter.schedule(() => fetch(url, options)).then(res => res.json());

export const useSWRCaching = (initialData?:any, url?:string) => {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`, 
    fetcher, 
    {
      fallbackData: initialData,
      // Cache for 1 minute (in ms)
      dedupingInterval: 60000,
      // Revalidate when window regains focus
      revalidateOnFocus: true,
      // Revalidate when reconnected
      revalidateOnReconnect: true
    }
  )

  return { data, isLoading, error };
}

export const useSWRCachingAnimeApi = (initialData?:any, url?:string) => {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL_ANIME_API}${url}`, 
    fetcher, 
    {
      fallbackData: initialData,
      // Cache for 1 minute (in ms)
      dedupingInterval: 60000,
      // Revalidate when window regains focus
      revalidateOnFocus: true,
      // Revalidate when reconnected
      revalidateOnReconnect: true
    }
  )

  return { data, isLoading, error };
}