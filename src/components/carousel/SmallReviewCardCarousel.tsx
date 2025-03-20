'use client'
import Slider from 'react-slick';
import React, { useRef } from 'react'
import { useSWRCaching } from '@/utils/useSWR';
import { Box, Flex, Heading, HStack, Stack } from '@chakra-ui/react';

import Carousel from './Carousel';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SkeletonLoader from '../loader/SkeletonLoader';
import SmallReviewCards from '../cards/SmallReviewCards';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const SmallReviewCardCarousel = ({initialData, label, url}:{initialData:any, label:string, url:string}) => {
  const { data, isLoading, error } = useSWRCaching(initialData, url);

  const sliderRef = useRef<Slider>(null);
  
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  
  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <Stack alignItems={'start'} gap={'20px'} width={'100%'}>
      <HStack alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={{base:'1rem', md:'2rem', lg:'2rem'}} fontStyle={'italic'}>{label}</Heading>
        {data?.data?.length > 5 && (
          <Flex alignItems={'center'} gap={{base:'15px', md:'20px'}}>
            <button onClick={handlePrev} className='p-[.6rem] rounded-full hover:cursor-pointer'> <FaAngleLeft size={35} color='white' /> </button>
            <button onClick={handleNext} className='p-[.6rem] rounded-full hover:bg-gray-500 hover:cursor-pointer'> <FaAngleRight size={35} color='white' /> </button>
          </Flex>
        )}
      </HStack>
      <Box width={{base:'100%', md:'100%'}}>
          {isLoading ? (
            <Flex alignItems={'center'} gap={'20px'}>
              {Array.from({length:4}).map((_, idx:number) => (
                <SkeletonLoader key={idx} dimension={{
                  width: {base:'100%', md:'320px', lg:'400px'},
                  height: {base:'200px', md:'280px'}
                }} />
              ))}
            </Flex>
          ) : (
            <>
              {data?.data?.length > 5 ? (
              <Carousel ref={sliderRef} settings={settings}>
                {data?.data?.map((item: any) => {
                  return (
                    <SmallReviewCards
                      key={item?.entry?.mal_id}
                      data={item}
                    />
                  )
                })}
              </Carousel>
              ) : (
                <Flex alignItems={'start'} gap={'20px'} flexWrap={'wrap'}>
                  {data?.data?.map((item: any) => {
                    return (
                      <SmallReviewCards
                        key={item?.entry?.mal_id}
                        data={item}
                      />
                    )
                  })}
                </Flex>
              )}
            </>
          )}
      </Box>
    </Stack>
  )
}

export default SmallReviewCardCarousel