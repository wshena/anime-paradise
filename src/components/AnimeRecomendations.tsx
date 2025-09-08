'use client'
import React, { useRef } from 'react'
import { useSWRCaching } from '@/lib/swr'
import Slider from 'react-slick';
import { AngleLeftIcon, AngleRightIcon } from '@/icons';
import Carousel from './carousel/Carousel';
import AnimeCard from './cards/AnimeCard';
import ContentContainer from './containers/ContentContainer';

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

const AnimeRecomendations = ({initialData, animeId}:{initialData:any, animeId:number}) => {
  const { data, isLoading, error } = useSWRCaching(`/anime/${animeId}/recommendations`, initialData);
  const recommendations = data?.data

  const sliderRef = useRef<Slider>(null);
  
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  
  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  // jika tidak ada recomendasi, maka jangan tampilkan
  if (recommendations.length <= 0) {
    return
  }

  return (
    <section id="anime-recommendations" className='w-full flex flex-col bg-black items-start gap-5 text-white py-10'>
      <ContentContainer>
        <div className="py-5 flex items-center justify-between">
          <h1 className="text-lg md:text-xl xl:text-4xl font-bold capitalize">more like this</h1>
          {/* prev & next button */}
          <div className='flex lg:none items-center gap-4 md:gap-5'>
            <button onClick={handlePrev} className='p-1 rounded-full hover:bg-gray-300/50 cursor-pointer'> <AngleLeftIcon size={35} classname='text-white' /> </button>
            <button onClick={handleNext} className='p-1 rounded-full hover:bg-gray-300/50 cursor-pointer'> <AngleRightIcon size={35} classname='text-white' /> </button>
          </div>
        </div>

        <div className='h-fit w-full'>
          {recommendations.length <= 5 ? (
            <ul className='grid grid-cols-5 gap-3'>
              {recommendations.map((item: any) => (
                <li key={item?.entry?.mal_id}>
                  <AnimeCard key={item?.entry?.mal_id} anime={item?.entry} animeId={item?.entry?.mal_id} />
                </li>
              ))}
            </ul>
          ) : (
            <Carousel ref={sliderRef} settings={settings}>
              {recommendations.map((item: any) => (
                <AnimeCard key={item?.mal_id} anime={item?.entry} animeId={item?.entry?.mal_id} />
              ))}
            </Carousel>
          )}
        </div>
      </ContentContainer>
    </section>
  )
}

export default AnimeRecomendations