'use client'
import React, { ReactNode, forwardRef } from 'react';
import Slider from 'react-slick';

interface Props {
  children: ReactNode;
  settings: {};
  style?:string;
}

const Carousel = forwardRef<Slider, Props>(
  ({ children, settings, style }, ref) => {
    return (
      <div className={`slider-container ${style}`}>
        <Slider ref={ref} {...settings} className='w-full'>
          {children}
        </Slider>
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;