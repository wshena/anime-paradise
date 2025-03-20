import React from 'react'
import { Center, Grid, Heading, Stack } from '@chakra-ui/react';

import { GetTopAnime } from '@/utils/fetcher'

import NoData from '@/components/NoData';
import AnimeCard from '@/components/cards/AnimeCard';
import CustomPagination from '@/components/Pagination';
import MainWrapper from '@/components/wrapper/MainWrapper';
import SkeletonLoader from '@/components/loader/SkeletonLoader';
import ContentWrapper from '@/components/wrapper/ContentWrapper';

export const metadata = {
  title: 'Browse Top Airing Anime - Anime Paradise',
  description: "Embark on an anime adventure with Anime Paradise, your ultimate destination for watching a vast collection of anime series and movies. Delve into the captivating worlds of hit titles such as One Piece, Jujutsu Kaisen, Chainsaw Man, and Attack on Titan. Browse top airing anime list, find it, and watch it!",
}

const page = async () => {
  const topAiringAnime = await GetTopAnime({
    filter:'airing'
  });

  return (
    <MainWrapper>
      <ContentWrapper>
        <Stack gap={{base:'30px', md:'40px'}} paddingY={{ base: '30px', md: '50px' }}>
          <Heading as={'h1'} fontSize={{base:'1rem', md:'1.3rem', lg:'1.5rem'}}>Top Airing</Heading>
          {topAiringAnime?.data?.length <= 0 ? (
            <NoData />
          ) : (
            <>
              <Center width={'100%'}>
                <Grid
                  templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
                  gap={{ base: '15px', md: '20px' }}
                  width={{ base: '100%', xl: '100%' }}
                >
                  {!topAiringAnime ? (
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
                      {topAiringAnime?.data?.map((item: any, idx:number) => (
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
                <CustomPagination count={topAiringAnime?.pagination?.items?.total} pageSize={topAiringAnime?.pagination?.items?.per_page} defaultPage={1} />
              </Center>
            </>
          )}
        </Stack>
      </ContentWrapper>
    </MainWrapper>
  )
}

export default page