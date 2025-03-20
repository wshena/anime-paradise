import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Center, Flex, Stack } from '@chakra-ui/react'
import { createSlug, truncateTitle } from '@/utils/functions'
import { GenreProps, JumbotronInfoProps } from '@/utils/interface'

import { H1, Paragraph } from '../Typography'
import ContentWrapper from '../wrapper/ContentWrapper'

import { FaStar } from "react-icons/fa";

const JumbotronInfo = ({title, image, rating, genre, synopsis, id}:JumbotronInfoProps) => {
  return (
    <Flex flexDirection={{base:'column', md:'row'}} alignItems={'start'} gap={{base:'15px', md:'20px'}} width={'100%'} color={'whiteAlpha.900'}>
      {/* cover for mobile */}
      <Center width={'100%'} display={{base:'flex', md:'none'}}>
        <Box position={'relative'} width={{base:'120px', md:'200px'}} height={{base:'200px', md:'280px'}}>
          <Image src={image} alt={title} fill className='rounded-[5px]' />
        </Box>
      </Center>

      {/* cover for md */}
      <Box position={'relative'} width={{base:'120px', md:'200px'}} height={{base:'200px', md:'280px'}} display={{base:'none', md:'block'}}>
        <Image src={image} alt={title} fill className='rounded-[5px]' />
      </Box>

      {/* anime infos */}
      <Stack alignItems={'start'} width={{base:'100%', md:'70%'}}>
        <Link href={`/anime/${id}/${createSlug(title)}`}>
          <H1 label={truncateTitle(title, 50)} />
        </Link>
        <Flex flexDirection={{base:'column', md:'row'}} alignItems={{base:'start', md:'center'}} gap={'15px'} fontSize={'1rem'}>
          <Flex alignItems={'center'} gap={'10px'}>
            <FaStar size={20} color='yellow' />
            <span>{rating}</span>
          </Flex>
          <Flex alignItems={'center'} gap={'10px'}>
            {genre?.map((item:GenreProps, idx:number) => (
              <Link href={'#'} key={item?.mal_id} >
                <span className='hover:underline'>
                  {item?.name}
                  {idx < genre.length - 1 && ', '}
                </span>
              </Link>
            ))}
          </Flex>
        </Flex>
        <Box width={'100%'} display={{base:'none', md:'block'}}>
          <Paragraph text={truncateTitle(synopsis, 400)} />
        </Box>
        <Box width={'100%'} display={{base:'block', md:'none'}}>
          <Paragraph text={truncateTitle(synopsis, 100)} />
        </Box>
      </Stack>
    </Flex>
  )
}

const JumbotronCard = ({data}:{data:any}) => {
  return (
    <Box width={'100%'} height={{base:'500px', md:'500px'}} position={'relative'} bgImage={`url(${data?.images?.jpg?.large_image_url})`} bgSize={'contain'}>
        <Center justifyContent={'flex-start'} paddingX={{base:'20px', md:'50px'}} position={'absolute'} top={0} left={0} width={'100%'} height={'100%'} className='bg-black/80'>
          <ContentWrapper>
            <JumbotronInfo 
              id={data?.mal_id}
              title={data?.title} 
              image={data?.images?.jpg?.image_url} 
              rating={data?.score} 
              genre={data?.genres}
              synopsis={data?.synopsis}
            />
          </ContentWrapper>
        </Center>
    </Box>
  )
}

export default JumbotronCard