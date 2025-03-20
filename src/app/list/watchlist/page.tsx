'use client'
import AnimeCard from '@/components/cards/AnimeCard'
import SkeletonLoader from '@/components/loader/SkeletonLoader'
import { RootState, useAppSelector } from '@/redux/store'
import { Box, Center, Grid, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Empty = () => {
  return (
    <Center width={'100%'}>
      <Stack alignItems={'center'} gap={'20px'}>
        <Image src={'/image/empty-watchlist.png'} alt='empty-watchlist' width={200} height={200} />
        <Stack textAlign={'center'} gap={'-10px'} fontSize={{base:'.8rem', md:'.9rem'}}>
          <span>Your Watchlist needs some love.</span>
          <span>Let’s fill it up with awesome anime.</span>
        </Stack>
        <Link href={'/'}>
          <Box paddingX={'1rem'} paddingY={'.8rem'} color={'black'} bgColor={'rgb(255, 100, 10)'}>
            <span className='uppercase font-bold text-[.8rem] md:text-[.9rem]'>go to home feed</span>
          </Box>
        </Link>
      </Stack>
    </Center>
  )
};

const page = () => {
  const {user} = useAppSelector((state:RootState) => state.auth);
  const {watchlist} = useAppSelector((state:RootState) => state.watchlist);

  const userWatchList = watchlist?.find((item: any) => item.userId === user?.id);

  const watchListLength = userWatchList?.userWatchlist?.length ?? 0;
  if (watchListLength <= 0) {
    return <Empty />;
  }

  return (
    <Center width={'100%'}>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
        gap={{ base: '15px', md: '20px' }}
        width={{ base: '100%', xl: '100%' }}
      >
          {!userWatchList ? (
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
            {userWatchList?.userWatchlist?.map((item: any, idx:number) => (
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
  )
}

export default page