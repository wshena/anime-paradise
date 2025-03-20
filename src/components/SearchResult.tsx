'use client'
import { RootState, useAppSelector } from '@/redux/store';
import { GetAnimeList } from '@/utils/fetcher';
import { Box, Center, Grid, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import AnimeCard from './cards/AnimeCard';
import CustomPagination from './Pagination';
import SkeletonLoader from './loader/SkeletonLoader';

const SearchResult = () => {
  const {searchParam} = useAppSelector((state:RootState) => state.utility);
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Buat timer debouncing selama 500ms
    const timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await GetAnimeList({
            q: `'${searchParam}'`
          })
          setResult(response);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, 500); // Delay 500ms

    // Bersihkan timer saat searchParam berubah sebelum delay habis
    return () => clearTimeout(timer);
  }, [searchParam]);
  
  return (
    <Stack alignItems={'center'} gap={{base:'30px', md:'40px'}}>
      <Center width={'100%'}>
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
          gap={{ base: '15px', md: '20px' }}
          width={{ base: '100%', xl: '100%' }}
        >
          {loading ? (
            <>
              {Array.from({length:10}).map((_,idx:number) => (
                <SkeletonLoader key={idx} dimension={{
                  width: {base:'120px', md:'200px'},
                  height: {base:'200px', md:'280px'}
                }} />
              ))}
            </>
          ) : (
            <>
              {result?.data?.map((item: any, idx:number) => (
                <AnimeCard key={`${item.mal_id}- ${idx}`} data={{
                  id: item?.mal_id,
                  title: item?.title,
                  image: item?.images?.jpg?.image_url,
                }} />
              ))}
            </>
          )}
        </Grid>
      </Center>
      {result?.pagination?.has_next_page && (
        <Center width={'100%'}>
          <CustomPagination count={result?.pagination?.items?.total} pageSize={result?.pagination?.items?.per_page} defaultPage={1} />
        </Center>
      )}
    </Stack>
  )
}

export default SearchResult