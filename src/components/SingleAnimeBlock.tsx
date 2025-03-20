import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { createSlug, truncateTitle } from '@/utils/functions'

import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";

const SingleAnimeBlock = ({data, image}:{data:any, image:string}) => {
  const slug = createSlug(data?.title);

  return (
    <Stack width={'100%'} direction={{base:'column', md:'row'}} gap={{base:'20px', md:'30px'}} alignItems={'center'}>
      <figure>
        <Box width={{base:'265px', md:'350px', lg:'450px', xl:'600px'}} height={{base:'157px', md:'236px', lg:'239px', xl:'300px'}} position={'relative'}>
          <Image src={image} alt={data?.title} fill />
        </Box> 
      </figure>

      <Stack width={{base:'100%', md:'50%'}} alignItems={'start'} gap={{base:'10px', md:'20px'}}>
        <Link href={`/anime/${data?.mal_id}/${createSlug(data?.title)}`} className='hover:underline cursor-pointer'>
          <Heading as={'h1'} fontSize={{base:'1rem', md:'1.3rem'}} fontWeight={'bold'}>{data?.title}</Heading>
        </Link>
        <Text fontSize={{base:'.9rem'}} display={{base:'inline', md:'none'}}>{truncateTitle(data?.synopsis, 100)}</Text>
        <Text fontSize={{base:'.9rem'}} display={{base:'none', md:'inline'}}>{truncateTitle(data?.synopsis, 200)}</Text>
        <Flex alignItems={'center'} gap={{base:'10px', md:'20px'}}>
          <Link href={`/anime/${data?.mal_id}/${slug}`} className='cursor-pointer'>
            <Heading as={'span'} paddingY={{base:'5px', lg:'10px'}} paddingX={{base:'.7rem', md:'.6rem'}} border={'1px solid rgb(255, 100, 10) '} color={'black'} backgroundColor={'rgb(255, 100, 10)'} fontSize={{base:'.7rem', lg:'1rem'}} display={'flex'} alignItems={'center'} gap={'10px'}>
              <IoIosInformationCircle size={20} color='black' />
              More Info
            </Heading>
          </Link>
          <button className='cursor-pointer'>
            <Heading as={'span'} paddingY={{base:'5px', lg:'10px'}} paddingX={{base:'.7rem', md:'.6rem'}} border={'1px solid rgb(255, 100, 10) '} color={'rgb(255, 100, 10)'} backgroundColor={'black'} display={'flex'} alignItems={'center'} gap={'10px'} fontSize={{base:'.7rem', lg:'1rem'}}>
              <IoBookmarkOutline size={20} color='rgb(255, 100, 10)' />
              Add to Watchlist
            </Heading>
          </button>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default SingleAnimeBlock