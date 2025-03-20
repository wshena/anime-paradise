'use client'
import Slider from 'react-slick';
import React, { useRef } from 'react'
import { Box, Center, Flex, HStack, Stack } from '@chakra-ui/react';

import { useSWRCaching } from '@/utils/useSWR';

import Carousel from './Carousel';
import AnimeCard from '../cards/AnimeCard';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SkeletonLoader from '../loader/SkeletonLoader';
import { SectionTitle } from '../Typography';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
};

const CardCarousel = ({initialData, label, url}:{initialData:any, label:string, url:string}) => {
  const { data, isLoading, error } = useSWRCaching(initialData, url);

  const sliderRef = useRef<Slider>(null);
  
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  
  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <Stack alignItems={'start'} gap={'20px'} width={'100%'} position={'relative'}>
      {/* prev button */}
      <Center display={{base:'none', lg:'flex'}} position={'absolute'} top={0} left={0} width={'fit-content'} height={'100%'}>
        <button onClick={handlePrev} className='p-[.6rem] rounded-full hover:cursor-pointer'> <FaAngleLeft size={40} color='white' /> </button>
      </Center>

      {/* next button */}
      <Center display={{base:'none', lg:'flex'}} position={'absolute'} top={0} right={0} width={'fit-content'} height={'100%'}>
        <button onClick={handleNext} className='p-[.6rem] rounded-full hover:bg-gray-500 hover:cursor-pointer'> <FaAngleRight size={40} color='white' /> </button>
      </Center>
      
      <HStack alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <SectionTitle label={label} />
        {data?.data?.length > 5 && (
          <Flex display={{base:'flex', lg:'none'}} alignItems={'center'} gap={{base:'15px', md:'20px'}}>
            <button onClick={handlePrev} className='p-[.6rem] rounded-full hover:cursor-pointer'> <FaAngleLeft size={35} color='white' /> </button>
            <button onClick={handleNext} className='p-[.6rem] rounded-full hover:bg-gray-500 hover:cursor-pointer'> <FaAngleRight size={35} color='white' /> </button>
          </Flex>
        )}
      </HStack>
      <Center width={'100%'}>
        <Box width={{base:'100%', lg:'90%'}}>
          {isLoading ? (
            <Carousel ref={sliderRef} settings={settings} style='w-full'>
              {Array.from({length:5}).map((_,idx:number) => (
                <SkeletonLoader key={idx} dimension={{
                  width: {base:'120px', md:'200px'},
                  height: {base:'200px', md:'280px'}
                }} />
              ))}
            </Carousel>
          ) : (
            <>
              {data?.data?.length > 5 ? (
                <Carousel ref={sliderRef} settings={settings} style='w-full'>
                  {data?.data?.map((item: any) => {
                    if (item.hasOwnProperty('entry')) {
                      return (
                        <AnimeCard
                          key={item?.entry?.mal_id}
                          data={{
                            id: item?.entry?.mal_id,
                            title: item?.entry?.title,
                            image: item?.entry?.images?.jpg?.image_url,
                          }}
                        />
                      )
                    }
                    return (
                      <AnimeCard
                        key={item?.mal_id}
                        data={{
                          id: item?.mal_id,
                          title: item?.title,
                          image: item?.images?.jpg?.image_url,
                        }}
                      />
                    )
                  })}
                </Carousel>
              ) : (
                <Flex alignItems={'start'} gap={'20px'} flexWrap={'wrap'}>
                  {data?.data?.map((item: any) => {
                    if (item.hasOwnProperty('entry')) {
                      return (
                        <AnimeCard
                          key={item?.entry?.mal_id}
                          data={{
                            id: item?.entry?.mal_id,
                            title: item?.entry?.title,
                            image: item?.entry?.images?.jpg?.image_url,
                          }}
                        />
                      )
                    }
                    return (
                      <AnimeCard
                        key={item?.mal_id}
                        data={{
                          id: item?.mal_id,
                          title: item?.title,
                          image: item?.images?.jpg?.image_url,
                        }}
                      />
                    )
                  })}
                </Flex>
              )}
            </>
          )}
        </Box>
      </Center>
    </Stack>
  )
}

export default CardCarousel