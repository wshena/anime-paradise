import { Center, Heading, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ViewAllCollections = () => {
  return (
    <Center width={'100%'}>
      <Stack alignItems={'center'} gap={'15px'}>
        <Image src={'/image/yuzu.png'} alt='yuzu' width={300} height={200} className=''/>
        <Stack gap={{base:'-20px', md:'-10px'}} alignItems={'center'}>
          <Heading as={'h1'} color={'white'} fontWeight={'bold'} fontSize={{base:'.8rem', md:'1.3rem'}}>Still looking for something to watch?</Heading>
          <Heading as={'h1'} color={'white'} fontWeight={'bold'} fontSize={{base:'.8rem', md:'1.3rem'}}>Check out our full library</Heading>
        </Stack>
        <Link href={'/animes/popular'}>
          <Heading paddingY={'.5rem'} paddingX={'1.3rem'} fontSize={{base:'.9rem', md:'1rem'}} border={'1px solid rgb(255, 100, 10)'} color={'rgb(255, 100, 10)'} textTransform={'capitalize'} _hover={{cursor:'pointer'}}>View More</Heading>
        </Link>
      </Stack>
    </Center>
  )
}

export default ViewAllCollections