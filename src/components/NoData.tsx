import { Center, Heading, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const NoData = () => {
  return (
    <Center width={'100%'}>
      <Stack alignItems={'center'} gap={'15px'}>
        <Image src={'/image/yuzu.png'} alt='yuzu' width={300} height={200} className=''/>
        <Heading as={'h1'} color={'white'} fontWeight={'bold'} fontSize={{base:'.8rem', md:'1.3rem'}}>Sorry, but there is no data</Heading>
      </Stack>
    </Center>
  )
}

export default NoData