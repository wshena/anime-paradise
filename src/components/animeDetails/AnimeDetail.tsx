'use client'

import Image from 'next/image';
import React, { useEffect } from 'react'
import { useSWRCaching } from '@/utils/useSWR'
import { useAppDispatch, } from '@/redux/store';
import { setShowMoreSynopsis } from '@/redux/slice/utilitySlice';
import { setCurrentPlayAnime } from '@/redux/slice/animeSlice';
import { Box, Center, Flex, Heading, Stack, VStack, Text } from '@chakra-ui/react';

import { createSlug, truncateTitle } from '@/utils/functions';

import { FaStar } from 'react-icons/fa';

import SkeletonLoader from '../loader/SkeletonLoader';
import AddToWatchList from '../buttons/AddToWatchList';

const FlexItems = ({data, label}:{data:any, label:string}) => {
  
  return (
    <>
      {data?.length <= 0 ? (
        <></>
      ) : (
        <Stack display={{base:'none', md:'flex'}} direction={{base:'column', lg:'row'}} alignItems={{base:'start', lg:'center'}} gap={{base:'0px', lg:'20px'}} flexWrap={'wrap'}>
          <Heading as={'h3'} fontSize={{base:'.9rem', md:'1rem'}} textTransform={'capitalize'}>{label}</Heading>
          <Flex alignItems={'center'} gap={{base:'8px', lg:'20px'}} flexWrap={'wrap'}>
            {data?.map((item:any, index:number) => (
              <React.Fragment key={item?.mal_id}>
                <Heading as={'span'} fontSize={{base:'.9rem', md:'1rem'}} fontWeight={'light'}>{item?.name}</Heading>
                {index < data.length - 1 && <span>| </span>}
              </React.Fragment>
            ))}
          </Flex>
        </Stack>
      )}
    </>
  )
}

const Synopsis = ({ data }: { data: string }) => {
  const dispatch = useAppDispatch();
  
  return (
    <>
      <Text 
        fontSize={{ base: '.8rem', md: '1rem' }}
        display={{base:'none', md:'inline'}} 
      >
        {truncateTitle(data, 400)}
      </Text>
      <Text 
        fontSize={{ base: '.8rem', md: '1rem' }}
        display={{base:'inline', md:'none'}} 
      >
        {truncateTitle(data, 200)}
      </Text>
      <button 
        className='underline cursor-pointer'
        onClick={() => dispatch(setShowMoreSynopsis({
          display: true,
          data: data
        }))}
      >
        show more
      </button>
    </>
  )
}

const AnimeDetail = ({initialData, id}:{initialData:any, id:number}) => {
  const dispatch = useAppDispatch();

  const {data, isLoading, error} = useSWRCaching(initialData, `/anime/${id}/full`);

  if (error) {
    return (
      <Center width={'100%'} height={{base:'550px', md:'500px', lg:'400px'}} border={'1px solid gray.800'}>
        <Heading as={'h1'} fontSize={{base:'1rem', md:'1.5rem'}} fontWeight={'bold'} color={'whiteAlpha.900'}>There is no data, please reload the page</Heading>
      </Center>
    )
  }

  useEffect(() => {
    dispatch(setCurrentPlayAnime({
      id: data?.data?.mal_id,
      title: data?.data?.title,
      slug: createSlug(data?.data?.title),
      cover: data?.data?.images?.jpg?.image_url
    }))
  }, [dispatch, data]);

  return (
    <>
    {isLoading ? (
      <SkeletonLoader dimension={{
        width: '100%',
        height: {base:'550px', md:'500px', lg:'400px'}
      }} />
    ) : (
      <Stack alignItems={'start'} width={'100%'} gap={'35px'}>
        <Box width={'100%'} height={{base:'700px', md:'550px', lg:'400px'}} position={'relative'} backgroundImage={`url("${data?.data?.images?.jpg?.image_url}")`}>
          <Center position={'absolute'} width={'100%'} height={'100%'} paddingY={{base:'50px', md:'30px'}} className='bg-black/90'>
            <Flex flexDirection={{base:'column', md:'row'}} alignItems={'start'} gap={'30px'} width={'90%'}>
              {/* anime cover mobile */}
              <Center width={'100%'} display={{md:'none'}}>
                <Box position={'relative'} width={{base:'180px', md:'200px'}} height={{base:'230px', md:'300px'}}>
                  <Image src={data?.data?.images?.jpg?.image_url} fill alt={data?.data?.title} className='rounded-[5px]' />
                </Box>
              </Center>
              {/* anime cover desktop */}
              <Box display={{base:'none', md:'block'}} position={'relative'} width={{base:'180px', md:'200px'}} height={{base:'230px', md:'300px'}}>
                <Image src={data?.data?.images?.jpg?.image_url} fill alt={data?.data?.title} className='rounded-[5px]' />
              </Box>
              {/* anime details */}
              <VStack width={{base:'100%', md:'80%'}} alignItems={'start'} gap={'15px'}>
                <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1.4rem', md:'2rem'}}>
                  {data?.data?.title?.length > 60 ? truncateTitle(data?.data?.title, 60) : data?.data?.title}
                </Heading>
                <Flex alignItems={'center'} gap={'15px'} fontSize={{base:'1rem', md:'1.2rem'}}>
                  <Flex alignItems={'center'} gap={'10px'}>
                    <FaStar size={25} color='yellow' />
                    <span className='inline-block'>{data?.data?.score}</span>
                  </Flex>
                  <span className='text-[.9rem] md:text-[1rem]'>Ranked  <strong>#{data?.data?.rank}</strong> </span>
                  <span className='text-[.9rem] md:text-[1rem]'>Popularity  <strong>#{data?.data?.popularity}</strong> </span>
                </Flex>
                <Stack alignItems={'start'} width={'100%'} gap={'0px'}>
                  <FlexItems data={data?.data?.genres} label='genres:' />
                  <FlexItems data={data?.data?.themes} label='themes:' />
                </Stack>
                <Synopsis data={data?.data?.synopsis} />
                <AddToWatchList animeData={data?.data} />
              </VStack>
            </Flex>
          </Center>
        </Box>
      </Stack>
    )}
    </>
  )
}

export default AnimeDetail