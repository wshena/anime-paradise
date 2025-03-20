'use client'
import Slider from 'react-slick';
import { Box, Flex, Stack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react'

import Carousel from './Carousel';
import JumbotronCard from '../cards/JumbotronCard';
import SkeletonLoader from '../loader/SkeletonLoader';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSWRCaching } from '@/utils/useSWR';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};

const JumbotronCarousel = ({ initialData }: { initialData: any }) => {
  const { data, isLoading, error } = useSWRCaching(initialData, '/seasons/now?limit=10');
  
  const sliderRef = useRef<Slider>(null);
  
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  
  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  // automatic next slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <Box width={'100%'} position={'relative'}>
      {isLoading ? (
        <SkeletonLoader dimension={{ width: '100%', height: { base: '400px', md: '500px' } }} />
      ) : (
        <Carousel ref={sliderRef} settings={settings} style='rounded-[10px]'>
          {data?.data?.map((item: any) => (
            <JumbotronCard key={item?.mal_id} data={item} />
          ))}
        </Carousel>
      )}

      <Flex position={'absolute'} bottom={'20px'} right={'30px'} alignItems={'center'} gap={'20px'}>
        <button onClick={handlePrev} className='cursor-pointer'>
          <FaAngleLeft size={25} color='white' />
        </button>
        <button onClick={handleNext} className='cursor-pointer'>
          <FaAngleRight size={25} color='white' />
        </button>
      </Flex>
    </Box>
  )
}

export default JumbotronCarousel
