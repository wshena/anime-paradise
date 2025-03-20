import React from 'react'
import { Center, Grid, Stack } from '@chakra-ui/react'
import { GetAnimeFromSchedule } from '@/utils/fetcher'

import ContentWrapper from '@/components/wrapper/ContentWrapper'
import MainWrapper from '@/components/wrapper/MainWrapper'
import DayTable from '@/components/DayTable'
import NoData from '@/components/NoData'
import SkeletonLoader from '@/components/loader/SkeletonLoader'
import AnimeCard from '@/components/cards/AnimeCard'
import CustomPagination from '@/components/Pagination'

const page = async ({params, searchParams}:{params:any, searchParams:any}) => {
  const {day} = params;
  const {page} = searchParams;
  const animeList = await GetAnimeFromSchedule({
    filter: day,
    page: page
  });

  return (
    <MainWrapper>
      <ContentWrapper>
        <Stack alignItems={'start'} width={'100%'} gap={{base:'20px', md:'35px'}} paddingY={{ base: '30px', md: '50px' }}>
          <DayTable />
          {animeList?.data?.length <= 0 ? (
            <NoData />
          ) : (
            <>
              <Center width={'100%'}>
                <Grid
                  templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
                  gap={{ base: '15px', md: '20px' }}
                  width={{ base: '100%', xl: '100%' }}
                >
                  {!animeList ? (
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
                      {animeList?.data?.map((item: any, idx:number) => (
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
                <CustomPagination count={animeList?.pagination?.items?.total} pageSize={animeList?.pagination?.items?.per_page} defaultPage={1} />
              </Center>
            </>
          )}
        </Stack>
      </ContentWrapper>
    </MainWrapper>
  )
}

export default page