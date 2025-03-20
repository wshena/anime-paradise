import { SkeletonLoaderProps } from '@/utils/interface'
import { Box } from '@chakra-ui/react'
import React from 'react'

const SkeletonLoader = ({ dimension: { width, height } }:SkeletonLoaderProps) => {
  return (
    <Box width={width} height={height} backgroundColor={'gray.400'} borderRadius={'10px'} className='animate-pulse'></Box>
  )
}

export default SkeletonLoader
