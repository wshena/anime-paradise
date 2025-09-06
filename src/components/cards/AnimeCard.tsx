'use client'
import React, { useState } from 'react'
import { useSWRCaching } from '@/lib/swr'
import { createSlug, truncateTitle } from '@/functions';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';

const AnimeCard = ({anime, animeId}:{anime:any, animeId:number}) => {
  const [hover, setHover] = useState(false)
  const slug = createSlug(anime?.title);
  const coverImage = anime?.images?.jpg?.large_image_url;

  // State untuk src gambar dan counter reload agar tidak terjadi infinite loop
  const [imageSrc, setImageSrc] = useState(coverImage)
  const [reloadCount, setReloadCount] = useState(0)

  const handleImageError = () => {
    if (reloadCount < 3) {
      setReloadCount(reloadCount + 1)
      setImageSrc(coverImage + `?reload=${new Date().getTime()}`)
    }
  }

  return (
    <React.Fragment>
      {!anime ? (
        <Skeleton className="w-[120px] md:w-[200px] h-[200px] lg:h-[280px]" />
      ) : (
        <Link
          href={`/anime/${anime?.mal_id}/${slug}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className='flex flex-col items-start gap-2.5 w-fit'
        >
          <Image
            src={imageSrc}
            width={120}
            height={200}
            alt={anime?.title}
            onError={handleImageError}
            className='rounded-[10px] w-[120px] md:w-[200px] h-[200px] lg:h-[280px] '
          />
          <h2 className='font-bold text-sm md:text-md text-[rgb(255, 100, 10)] hover:text-white transition-color duration-300 ease-in-out'>
            {truncateTitle(anime?.title, 25)}
          </h2>
        </Link>
      )}
    </React.Fragment>
  )
}

export default AnimeCard