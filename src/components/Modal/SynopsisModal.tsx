'use client'
import React from 'react'
import { useAppDispatch } from '@/redux/store'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { setShowMoreSynopsis } from '@/redux/slice/utilitySlice'

import { MdCloseFullscreen } from "react-icons/md";

const SynopsisModal = ({synopsis}:{synopsis:string}) => {
  const dispatch = useAppDispatch();

  return (
    <Box padding={{base:'1rem', md:'1.4rem'}} borderRadius={'10px'} backgroundColor={'gray.800'} width={'80%'}>
      <Stack alignItems={'center'} gap={{base:'20px', md:'30px'}} color={'whiteAlpha.900'}>
        <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Heading as={'h1'} fontSize={{base:'1.3rem', md:'2rem'}} fontWeight={'bold'}>Synopsis</Heading>
          <button onClick={() => dispatch(setShowMoreSynopsis({
            display: false,
            data: ''
          }))} className='hover:cursor-pointer'>
            <MdCloseFullscreen size={25} color='white' />
          </button>
        </Flex>
        {!synopsis ? (
          <h1>loading</h1>
        ) : (
          <Text fontSize={{base:'.9rem', md:'1rem'}}>{synopsis}</Text>
        )}
      </Stack>
    </Box>
  )
}

export default SynopsisModal