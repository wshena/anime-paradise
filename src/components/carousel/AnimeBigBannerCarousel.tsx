'use client'
import Slider from 'react-slick';
import Carousel from './Carousel';
import React, { useEffect, useRef } from 'react'
import AnimeBigBanner from '../AnimeBigBanner';
import { AngleLeftIcon, AngleRightIcon } from '@/icons';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};

const AnimeBigBannerCaruosel = ({ itemArray }: { itemArray: any[] }) => {  
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
    <div className='w-full relative'>
      <Carousel ref={sliderRef} settings={settings}>
        {itemArray.map((item: any) => (
          <AnimeBigBanner key={item?.mal_id} item={item} />
        ))}
      </Carousel>

      {/* next and prev button */}
      <div className='absolute bottom-5 right-8 items-center gap-5'>
        <button onClick={handlePrev} className='p-1 rounded-full hover:bg-gray-300/50 cursor-pointer'>
          <AngleLeftIcon size={25} classname='text-white' />
        </button>
        <button onClick={handleNext} className='p-1 rounded-full hover:bg-gray-300/50 cursor-pointer'>
          <AngleRightIcon size={25} classname='text-white' />
        </button>
      </div>
    </div>
  )
}

export default AnimeBigBannerCaruosel