'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { 
  Box, 
  Flex, 
  Heading, 
  HStack, 
  Stack, 
  Text, 
  VStack 
} from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@/redux/store'
import { setShowReview } from '@/redux/slice/utilitySlice'

import { getRelativeTime, truncateTitle } from '@/utils/functions'

import SkeletonLoader from '../loader/SkeletonLoader'

const Review = ({ data, onClick }: { data: string, onClick:() => void }) => {
  return (
    <>
      <Text 
        fontSize={{ base: '.8rem', md: '1rem' }} 
        className='hidden lg:block'
      >
        {truncateTitle(data, 400)}
      </Text>
      <Text 
        fontSize={{ base: '.8rem', md: '1rem' }} 
        className='block lg:hidden'
      >
        {truncateTitle(data, 100)}
      </Text>
      <button className='underline cursor-pointer' onClick={onClick}>show more</button>
    </>
  )
}

const MotionBox = motion.create(Box)

const ReviewsCard = ({ data }: { data: any }) => {
  const dispatch = useAppDispatch();

  const date = new Date(data?.date)
  const relativeTime = getRelativeTime(date);

  // State untuk src gambar dan counter reload agar tidak terjadi infinite loop
  const [imageSrc, setImageSrc] = useState(data?.entry?.images?.jpg?.image_url)
  const [reloadCount, setReloadCount] = useState(0)

  const handleImageError = () => {
    // Misalnya kita batasi maksimal 3 kali reload
    if (reloadCount < 3) {
      setReloadCount(reloadCount + 1)
      // Tambahkan query param unik untuk menghindari cache
      setImageSrc(data?.entry?.images?.jpg?.image_url + `?reload=${new Date().getTime()}`)
    }
  }

  if (!data) {
    return (
      <SkeletonLoader dimension={{
        width: '100%',
        height: '312px'
      }} />
    )
  }

  const handleShowMore = () => {
    dispatch(setShowReview({
      display: true,
      data: data
    }))
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Box padding={'1rem'} borderRadius={'10px'} width={'100%'} backgroundColor={'gray.800'} color={'white.Alpha900'}>
        <HStack alignItems={'start'} width={'100%'} gap={{ base: '15px', md: '1rem' }}>
          <Box display={{base:'none', md:'block'}} position={'relative'} width={'200px'} height={{md:'200px', lg:'280px'}}>
            <Image src={imageSrc} fill alt={data?.entry?.title} onError={handleImageError} />
          </Box>
          <Stack alignItems={'start'} width={'100%'} gap={'20px'}>
            <VStack alignItems={'start'} width={'100%'} gap={'-10px'}>
              <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'} fontSize={{base:'.8rem', md:'1rem'}}>
                <span className='hidden md:inline'>By {data?.user?.username}</span>
                <span className='inline md:hidden'>By {truncateTitle(data?.user?.username, 10)}</span>
                <span>{relativeTime}</span>
              </Flex>
              <Heading as={'h3'} fontWeight={'bold'} fontSize={{ base: '1rem', md: '1.5rem' }}>
                {data?.entry?.title}
              </Heading>
            </VStack>
            <VStack alignItems={'start'} width={'100%'} gap={'10px'}>
              <Flex alignItems={'center'} gap={'8px'}>
                <FaStar size={20} color='yellow' />
                <span>{data?.score}</span>
                <Flex alignItems={'center'} gap={'10px'}>
                  {data?.tags?.map((item: string, idx: number) => (
                    <span 
                      key={`${idx} - ${item}`} 
                      className='border border-red-300 rounded-[5px] p-[.4rem]'
                    >
                      {item}
                    </span>
                  ))}
                </Flex>
              </Flex>
              <Review data={data?.review} onClick={handleShowMore} />
            </VStack>
          </Stack>
        </HStack>
      </Box>
    </MotionBox>
  )
}

export default ReviewsCard
