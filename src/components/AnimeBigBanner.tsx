'use client'
import React from 'react'
import { H1 } from './typography'
import Image from 'next/image'
import Link from 'next/link'
import { createSlug, truncateTitle } from '@/functions'
import { BookMarkIcon, PlayIcon, StarIcon } from '@/icons'
import ContentContainer from './containers/ContentContainer'
import ButtonIcon from './buttons/ButtonIcon'
import { useSWRCaching } from '@/lib/swr'
import { Skeleton } from './ui/skeleton'

const BannerInfo = ({title, image, rating, genre, synopsis, id}:BigBannerInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start w-full xl:w-[1000px] gap-3 md:gap-10 text-white">
      {/* cover image */}
      <div className="w-full md:w-fit flex items-center justify-center md:items-start md:justify-start">
        <div className="relative w-[150px] md:w-[200px] h-[200px] md:h-[280px]">
          <Image src={image} alt={title} loading='lazy' fill className='w-full h-full rounded-md' />
        </div>
      </div>

      {/* anime informations */}
      <div className="flex flex-col items-start gap-3 w-full">
        {/* title */}
        <Link href={`/anime/${id}/${createSlug(title)}`}>
          <H1 text={truncateTitle(title, 50)} />
        </Link>

        {/* rating and genre */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-5 text-md">
          <div className="flex items-center gap-2">
            <StarIcon size={20} classname='text-white' />
            <span className="text-sm">{rating}</span>
          </div>

          <div className="flex items-center gap-3">
            {genre?.map((item:GenreProps, idx:number) => (
              <Link href={'#'} key={item?.mal_id} >
                <span className='text-sm capitalize hover:underline'>
                  {item?.name}
                  {idx < genre.length - 1 && ', '}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* anime synopsis */}
        <p className='hidden md:block'>{truncateTitle(synopsis, 400)}</p>
        <p className='block md:hidden'>{truncateTitle(synopsis, 100)}</p>

        {/* navigate to detail page button and add to watchlist button */}
        <div className="flex items-center gap-5">
          {/* button to detail page */}
          <Link href={`/anime/${id}/${createSlug(title)}`} aria-label='redirect to detail page' className='cursor-pointer'>
            <button className="cursor-pointer flex items-center gap-4 bg-orange-500 py-2 px-4" aria-label='redirect to detail page'>
              <PlayIcon size={20} classname='text-black' />
              <span className="text-md font-semibold text-black">Start Watching E1</span>
            </button>
          </Link>
          
          {/* button to add anime to user wishlist */}
          <ButtonIcon icon={<BookMarkIcon size={25} classname='text-orange-500' />} classname="cursor-pointer p-2  border-2 border-orange-500" />
        </div>
      </div>
    </div>
  )
}

const AnimeBigBanner = ({item}:{item:any}) => {
  // cache data using swr
  const id = item?.mal_id
  const data = useSWRCaching(`/anime/${id}/full`, item);

  const animeData = data?.data?.data;
  const coverImage = animeData && animeData.images?.jpg?.large_image_url;

  if (data.isLoading) {
    return <Skeleton className="w-full h-[600px] lg:h-[600px]" />
  }

  return (
    <div className="relative w-full h-[700px] md:h-[600px] bg-repeat bg-contain" style={{
      backgroundImage: `url("${coverImage}")`
    }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-start pb-10 py-14 md:py-0">
        <ContentContainer>
          <BannerInfo 
            id={item?.mal_id}
            title={item?.title} 
            image={item?.images?.jpg?.image_url} 
            rating={item?.score} 
            genre={item?.genres}
            synopsis={item?.synopsis}
          />
        </ContentContainer>
      </div>
    </div>
  )
}

export default AnimeBigBanner