import { truncateTitle } from '@/functions';
import { PlayIcon } from '@/icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const EpisodeCard = ({episode, coverImage, animeTitle}:{episode:any, coverImage:string, animeTitle:string}) => {

  const episodeId = episode?.episodeId;
  const episodeTitle = episode?.name;
  const episodeNumber = episode?.episodeNo;  

  return (
    <Link href={`/watch/${episodeId}`} className='group w-fit flex flex-col gap-3'>
      {/* cover image */}
      <div className="relative">
        <div className="w-[250px] md:w-[300px] lg:w-[280px] h-[100px] md:h-[150px] bg-center bg-cover" style={{
          backgroundImage: `url("${coverImage}")`
        }}></div>
        <div className="group-hover:flex hidden absolute top-0 left-0 w-full h-full items-center justify-center bg-black/50">
          <PlayIcon size={20} classname='text-white' />
        </div>
      </div>
        
      {/* title & episode title */}
      <div className="space-y-1">
        <span className='text-sm text-gray-400'>{truncateTitle(animeTitle, 20)}</span>
        <h3 className='text-white group-hover:text-orange-500 text-sm md:text-md'>Ep.{episodeNumber} - {truncateTitle(episodeTitle, 50)}</h3>
      </div>
    </Link>
  )
}

export default EpisodeCard