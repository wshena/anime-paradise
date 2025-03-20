'use client';

import { useSWRCaching } from '@/utils/useSWR';
import { Box, Center, Grid, Heading, Stack } from '@chakra-ui/react';
import React from 'react'
import AnimePictureCard from '../cards/AnimePictureCard';
import SkeletonLoader from '../loader/SkeletonLoader';

const AnimePictureList = ({initialData, url}:{initialData:any, url:string}) => {
  const {data, isLoading, error} = useSWRCaching(initialData, url);
  
  return (
    <Stack alignItems={'start'} gap={'20px'} width={'100%'}>
      <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={{base:'1rem', md:'2rem', lg:'2rem'}} fontStyle={'italic'}>Pictures</Heading>
      <Center width={'100%'}>
        <Box width={{base:'100%', lg:'90%'}}>
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
            gap={{ base: '15px', md: '20px' }}
            width={{ base: '100%', xl: '100%' }}
          >
            {isLoading ? (
              <>
                {Array.from({length:4}).map((_,idx:number) => (
                  <SkeletonLoader key={idx} dimension={{
                    width:{base:'120px', md:'200px'},
                    height:{base:'200px', md:'280px'}
                  }} />
                ))}
              </>
            ) : (
              <>
                {data?.data?.map((item: any, idx:number) => (
                  <AnimePictureCard key={`${item.jpg?.image_url} - ${idx}`} data={item} />
                ))}
              </>
            )}
          </Grid>
        </Box>
      </Center>
    </Stack>
  )
}

export default AnimePictureList