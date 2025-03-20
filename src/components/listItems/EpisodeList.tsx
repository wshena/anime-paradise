'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useSWRCachingAnimeApi } from '@/utils/useSWR'
import { Box, Center, Flex, Grid, Heading, Stack } from '@chakra-ui/react';

import { RiListUnordered } from "react-icons/ri";

import EpisodeCard from '../cards/EpisodeCard';
import SkeletonLoader from '../loader/SkeletonLoader';
import { useAppDispatch } from '@/redux/store';
import { setAnimeEpisodeCover, setAnimeEpisodeList } from '@/redux/slice/animeSlice';

const EpisodeList = ({initialData, url, image}:{initialData:any, url:string, image:string}) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useSWRCachingAnimeApi(initialData, url)
  const episodeList = data?.episodes || []

  // State untuk jumlah elemen yang akan ditampilkan
  const [visibleCount, setVisibleCount] = useState(8)
  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 4)
  }

  // State untuk urutan
  const [order, setOrder] = useState<'oldest' | 'newest'>('oldest')
  // State untuk membuka dropdown pilihan urutan
  const [orderButtonClick, setOrderButtonClick] = useState<boolean>(false)

  // Mengurutkan episode berdasarkan state order. 
  // Misal: jika 'oldest', array tetap sama (diasumsikan data sudah ascending); 
  // jika 'newest', array dibalik.
  const sortedEpisodes = useMemo(() => {
    return order === 'oldest'
      ? [...episodeList]
      : [...episodeList].reverse()
  }, [episodeList, order])

  useEffect(() => {
    dispatch(setAnimeEpisodeList({
      totalEpisode: data?.totalEpisodes,
      episodes: episodeList
    }))
  }, [data])

  useEffect(() => {
    dispatch(setAnimeEpisodeCover(image))
  }, [image])

  return (
    <Stack alignItems={'start'} width={'100%'} gap={'20px'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Heading
          as={'h1'}
          fontWeight={'bold'}
          textTransform={'capitalize'}
          fontSize={{ base: '1rem', md: '2rem', lg: '2rem' }}
          fontStyle={'italic'}
        >
          Episodes
        </Heading>
        <Box position={'relative'}>
          <button onClick={() => setOrderButtonClick(!orderButtonClick)} className='block flex items-center gap-[10px] hover:cursor-pointer'>
            <RiListUnordered size={25} color='white' />
            <Heading as={'span'} fontSize={{base:'.8rem', md:'.9rem'}} textTransform={'uppercase'}>{order}</Heading>
          </button>

          {/* order list */}
          {orderButtonClick && (
            <Stack zIndex={30} position={'absolute'} top={'34px'} right={0} alignItems={'start'} width={{base:'100px', md:'200px'}} height={{base:'100px', md:'120px'}} backgroundColor={'gray.800'}>
              <button onClick={() => {
                setOrder('oldest')
                setOrderButtonClick(false);
              }} className='w-full cursor-pointer'>
                <Heading
                  as="span"
                  display="block"
                  fontSize={{ base: '.9rem', md: '.9rem' }}
                  textTransform="uppercase"
                  rounded="5px"
                  paddingY={'.6rem'}
                  paddingX={'1rem'}
                  _hover={{ bg: 'gray.900' }}
                  textAlign={'left'}
                >
                  oldest
                </Heading>
              </button>
              <button onClick={() => {
                setOrder('newest')
                setOrderButtonClick(false);
              }} className='w-full cursor-pointer'>
                <Heading
                  as="span"
                  display="block"
                  fontSize={{ base: '.9rem', md: '.9rem' }}
                  textTransform="uppercase"
                  rounded="5px"
                  paddingY={'.6rem'}
                  paddingX={'1rem'}
                  _hover={{ bg: 'gray.900' }}
                  textAlign={'left'}
                >
                  newest
                </Heading>
              </button>
            </Stack>
          )}
        </Box>
      </Flex>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
        gap={{ base: '15px', md: '20px' }}
        width={{ base: '100%', xl: '100%' }}
      >
        {!data ? (
          <>
            {Array.from({length:8}).map((_, idx:number) => (
              <SkeletonLoader dimension={{
                width: { base: '250px', md: '300px', lg: '280px', xl: '300px' },
                height: { base: '100px', md: '150px' }
              }} />
            ))}
          </>
        ) : (
          <>
            {sortedEpisodes.slice(0, visibleCount).map((item: any) => (
              <EpisodeCard key={item?.episodeId} data={{
                episode: item,
                image: image
              }} />
            ))}
          </>
        )}
      </Grid>

      {/* Jika jumlah data lebih banyak dari visibleCount, tampilkan tombol Show More */}
      {episodeList.length > visibleCount && (
        <Center width={'100%'}>
          <button onClick={handleShowMore} className='cursor-pointer w-[80%]'>
            <Heading
              as="span"
              display="block"
              fontSize={{ base: '.9rem', md: '1rem' }}
              textTransform="capitalize"
              rounded="5px"
              padding={'.6rem'}
              width={'100%'}
              border={'1px solid gray'}
              _hover={{ bg: 'rgb(255, 100, 10)', border:'1px solid rgb(255, 100, 10)' }}
              className='transition-all duration-300 ease-in-out'
            >
              show more
            </Heading>
          </button>
        </Center>
      )}
    </Stack>
  )
}

export default EpisodeList