import React from 'react'

import ContentWrapper from '@/components/wrapper/ContentWrapper'
import MainWrapper from '@/components/wrapper/MainWrapper'
import { GetTopAnime } from '@/utils/fetcher';
import { Center, Grid, Heading, Stack } from '@chakra-ui/react';
import AnimeCard from '@/components/cards/AnimeCard';
import CustomPagination from '@/components/Pagination';
import SkeletonLoader from '@/components/loader/SkeletonLoader';
import NoData from '@/components/NoData';
import PopularFilter from '@/components/PopularFilter';

const page = async ({searchParams}:{searchParams:any}) => {
  const {page, type} = await searchParams;
  const popularList = await GetTopAnime({
    page: page,
    type: type
  })

  return (
    <MainWrapper>
      <ContentWrapper>
        <Stack gap={{base:'30px', md:'40px'}} paddingY={{ base: '30px', md: '50px' }}>
          <PopularFilter label='Most Popular Anime' />
          {popularList?.data?.length <= 0 ? (
            <NoData />
          ) : (
            <>
              <Center width={'100%'}>
                <Grid
                  templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
                  gap={{ base: '15px', md: '20px' }}
                  width={{ base: '100%', xl: '100%' }}
                >
                  {!popularList ? (
                    <>
                      {Array.from({length:8}).map((_, idx:any) => (
                        <SkeletonLoader key={idx} dimension={{
                          width: {base:'120px', md:'200px'},
                          height: {base:'200px', md:'280px'}
                        }} />
                      ))}
                    </>
                  ) : (
                    <>
                      {popularList?.data?.map((item: any, idx:number) => (
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
              <Center width={'100%'}>
                <CustomPagination count={popularList?.pagination?.items?.total} pageSize={popularList?.pagination?.items?.per_page} defaultPage={1} />
              </Center>
            </>
          )}
        </Stack>
      </ContentWrapper>
    </MainWrapper>
  )
}

export default page