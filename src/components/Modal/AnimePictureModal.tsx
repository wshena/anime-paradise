'use client'
import { setShowAnimePicture } from '@/redux/slice/utilitySlice';
import { useAppDispatch } from '@/redux/store'
import { Stack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'

const AnimePictureModal = ({data}:{data:any}) => {
  const dispatch = useAppDispatch();

  return (
    <Stack alignItems={'start'} gap={{base:'20px', md:'30px'}} paddingY={{base:'20px', lg:'30px'}} onClick={() => {
      dispatch(setShowAnimePicture({
        display: false,
        data: null
      }))
    }} className='cursor-pointer'>
      <Image src={data} alt='anime-pictures' width={300} height={500} className='w-full h-full' />
    </Stack>
  )
}

export default AnimePictureModal