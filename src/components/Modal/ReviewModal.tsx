import { setShowReview } from '@/redux/slice/utilitySlice'
import { useAppDispatch } from '@/redux/store'
import { getRelativeTime, truncateTitle } from '@/utils/functions'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { MdCloseFullscreen } from 'react-icons/md'

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

const ReviewModal = ({data}:{data:any}) => {
  const dispatch = useAppDispatch();

  const relativeTime = getRelativeTime(data?.date);

  return (
    <Box borderRadius={'10px'} width={'80%'} height={'fit-content'} padding={{base:'1rem', md:'1.4rem'}} backgroundColor={'gray.800'} color={'whiteAlpha.900'}>
      <Stack width={'100%'}>
        <Flex width={'100%'} justifyContent={'space-between'}>
          <Heading as={'span'} fontSize={'1rem'} color={'whiteAlpha.900'}>{relativeTime}</Heading>
          <button onClick={() => dispatch(setShowReview({
            display: false,
            data: null
          }))} className='hover:cursor-pointer'>
            <MdCloseFullscreen size={25} color='white' />
          </button>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Profile data={data?.user} id={data?.mal_id} />
          <Rating score={data?.score} />
        </Flex>
        <Text fontSize={{base:'.9rem', md:'1rem'}} maxHeight={'400px'} overflowY={'auto'}>{data?.review}</Text>
      </Stack>
    </Box>
  )
}

export default ReviewModal