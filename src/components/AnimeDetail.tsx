'use client'
import { useSWRCaching } from '@/lib/swr'
import React, { useEffect, useRef, useState } from 'react'
import ContentContainer from './containers/ContentContainer';
import { H1, H3 } from './typography';
import { truncateTitle } from '@/functions';
import { BookMarkIcon, PlayIcon, StarIcon } from '@/icons';
import Link from 'next/link';
import ButtonIcon from './buttons/ButtonIcon';
import Image from 'next/image';
import SynopsisContainer from './SynopsisContainer';

const FlexItems = ({data, label}:{data:any, label?:string}) => {
  return (
    <>
      {data?.length > 0 && (
        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-5 flex-wrap'>
          {label && <h3 className='text-sm md:text-md font-semibold'>{label}</h3>}
          <ul className='flex items-center gap-1 md:gap-3 flex-wrap'>
            {data?.map((item:any, index:number) => (
              <li key={item?.mal_id}>
                <span className='text-sm md:text-md font-light'>{item?.name}</span>
                {index < data.length - 1 && <span> | </span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

const LabelAndValue = ({label, value}:{label:string, value:string}) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm md:text-md font-semibold capitalize">{label}</span>
      <span className="text-sm md:text-md">{value}</span>
    </div>
  )
}

const AnimeDetail = ({anime, animeId}:{anime:any, animeId:number}) => {
  const { data, isLoading, error } = useSWRCaching(`/anime/${animeId}/full`, anime);

  const animeDetail = data && data?.data;
  const title = animeDetail?.title;
  const titles = animeDetail?.titles;
  const type = animeDetail?.type;
  const source = animeDetail?.type;
  const status = animeDetail?.status;
  const rating = animeDetail?.rating;
  const season = animeDetail?.season;
  const year = animeDetail?.year;
  const producers = animeDetail?.producers;
  const studios = animeDetail?.studios;
  const themes = animeDetail?.themes;
  const synopsis = animeDetail?.synopsis;
  const score = animeDetail?.score;
  const genres = animeDetail?.genres;
  const coverImage = animeDetail && animeDetail.images?.jpg?.large_image_url;

  return (
    <section id='anime-detail' className=''>
      <div className="relative w-full h-[600px] md:h-[500px] bg-repeat bg-contain" style={{
        backgroundImage: `url("${coverImage}")`
      }}>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-start py-14 md:py-0">
          <ContentContainer>
            <div className="flex flex-col items-center md:items-start gap-8 text-white">
              <div className="flex flex-col items-center md:items-start md:flex-row gap-5">
                {/* cover image */}
                <div className="w-full md:w-fit flex items-center justify-center md:items-start md:justify-start">
                  <div className="relative w-[150px] md:w-[200px] h-[200px] md:h-[280px]">
                    <Image src={coverImage} alt={title} loading='lazy' fill className='w-full h-full rounded-md' />
                  </div>
                </div>
                {/* title, score, and genres */}
                <div className="flex flex-col items-center text-center md:text-start md:items-start gap-1">
                  {/* title */}
                  <H1 text={truncateTitle(title, 50)} />
                  {/* score and genres */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <StarIcon size={20} classname='text-white' />
                      <span className="text-sm md:text-md">{score}</span>
                    </div>
                    <FlexItems data={genres} />
                  </div>

                  {/* button */}
                  <div className="mt-5 flex items-center gap-5">
                    {/* button to episodes section */}
                    <Link href={'episodes'} aria-label='redirect to episode section' className='cursor-pointer'>
                      <button className="cursor-pointer flex items-center gap-4 bg-orange-500 py-2 px-4" aria-label='redirect to episode section'>
                        <PlayIcon size={20} classname='text-black' />
                        <span className="text-md font-semibold text-black">Start Watching E1</span>
                      </button>
                    </Link>
                    
                    {/* button to add anime to user wishlist */}
                    <ButtonIcon icon={<BookMarkIcon size={25} classname='text-orange-500' />} classname="cursor-pointer p-1 border-2 border-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </ContentContainer>
        </div>
      </div>

      {/* paragraf and more info */}
      <div className="bg-black py-10">
        <ContentContainer>
          <div className="flex flex-col lg:flex-row items-start gap-10">
            <div className="w-full lg:w-[50%]">
              <SynopsisContainer synopsis={synopsis} />
            </div>

            <div className="w-full lg:w-[50%] text-white">
              <div className="flex flex-col items-start gap-3">
                <LabelAndValue label='rating:' value={rating} />
                <LabelAndValue label='type:' value={type} />
                <LabelAndValue label='status:' value={status} />
                <LabelAndValue label='source:' value={source} />
                <LabelAndValue label='season:' value={`${season}, ${year}`} />

                {/* alternate titles */}
                <div className="space-y-2">
                  <h3 className='text-sm md:text-md font-semibold'>Alternate Titles:</h3>
                  <ul className="flex flex-wrap items-center gap-1">
                    {titles?.map((item:TitlesProps, index:number) => (
                      <li key={item?.title}>
                        <span className='text-sm md:text-md'>{item?.title}</span>
                        {index < titles.length - 1 && <span>, </span>}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* themes */}
                <FlexItems data={themes} label='Themes' />
                {/* studios */}
                <FlexItems data={studios} label='Studios' />
                {/* producers */}
                <FlexItems data={producers} label='Producers' />
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </section>
  )
}

export default AnimeDetail