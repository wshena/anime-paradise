'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { getRelativeTime, truncateTitle } from '@/utils/functions'

import { FaStar } from 'react-icons/fa'
import { IoBookOutline } from "react-icons/io5";
import { useAppDispatch } from '@/redux/store'
import { setShowReview } from '@/redux/slice/utilitySlice'

const Rating = ({score}:{score:number}) => {
  return (
    <Flex alignItems={'center'} gap={'15px'}>
      <FaStar size={20} color='yellow' />
      <span>{score}</span>
    </Flex>
  )
}

const Profile = ({data, id}:{data:any, id:number}) => {
  return (
    <Flex alignItems={'start'} gap={'10px'} color={'whiteAlpha.900'}>
      <Box width={'50px'} height={'50px'} className='rounded-full' position={'relative'}>
        <Image src={data?.images?.jpg?.image_url} fill className='rounded-full' alt={data?.username} />
      </Box>
      <Stack alignItems={'start'} gap={'-15px'}>
        <Heading as={'span'} fontSize={{base:'1rem', md:'1.3rem'}} fontWeight={'bold'}>{truncateTitle(data?.username, 10)}</Heading>
        <Heading as={'span'} fontSize={'.7rem'}>MAL ID: {id}</Heading>
      </Stack>
    </Flex>
  )
}

const glassmorphism = {
  background: 'rgba( 255, 255, 255, 0.15 )',
  boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
  backdropFilter: 'blur( 2px )',
  borderRadius: '10px',
}

const MotionCenter = motion.create(Center)

const SmallReviewCards = ({data}:{data:any}) => {
  const dispatch = useAppDispatch();

  const [hover, SetHover] = useState<boolean>(false);

  const relativeTime = getRelativeTime(data?.date)

  return (
    <Box position={'relative'} cursor={'pointer'} borderRadius={'10px'} width={{base:'100%', md:'320px', lg:'400px'}} padding={{base:'1rem', md:'1.4rem'}} backgroundColor={'gray.800'} color={'whiteAlpha.900'} onMouseEnter={() => SetHover(true)} onMouseLeave={() => SetHover(false)}>
      {hover && (
        <MotionCenter zIndex={20} position={'absolute'} top={0} left={0} width={'100%'} height={'100%'} style={glassmorphism} initial={{opacity:0}} animate={{opacity: hover ? 1 : 0}} transition={{duration: 0.3}} onClick={() => {
          dispatch(setShowReview({
            display: true,
            data: data
          }))
        }}>
          <button  
            onClick={() => {
              dispatch(setShowReview({
                display: true,
                data: data
              }))
            }}
            className='flex flex-col items-center gap-[10px] cursor-pointer'>
              <IoBookOutline size={30} color='white' />
              <Heading as={'span'} fontSize={'1rem'} color={'whiteAlpha.900'}>Read More</Heading>
          </button>
        </MotionCenter>
      )}
      <Stack width={'100%'}>
        <Flex width={'100%'} justifyContent={'flex-end'}>
          <Heading as={'span'} fontSize={'.9rem'} color={'whiteAlpha.900'}>{relativeTime}</Heading>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Profile data={data?.user} id={data?.mal_id} />
          <Rating score={data?.score} />
        </Flex>
        <Text fontSize={{base:'.9rem', md:'.9rem'}}>{truncateTitle(data?.review, 150)}</Text>
      </Stack>
    </Box>
  )
}

export default SmallReviewCards