'use client'
import React, { useMemo, useState } from 'react'
import { useSWRCachingAnimeApi } from '@/lib/swr'
import ContentContainer from './containers/ContentContainer';
import { ListIcon } from '@/icons';
import { Skeleton } from './ui/skeleton';
import EpisodeCard from './cards/EpisodeCard';

const AnimeEpisodes = ({animeId, coverImage, animeTitle}:{animeId:any, coverImage:string, animeTitle:string}) => {
  const {data, isLoading, error} = useSWRCachingAnimeApi(`/episodes/${animeId}`);
  
  const episodes = data?.episodes;
  
  console.log(episodes)
  // State untuk jumlah elemen yang akan ditampilkan
  const [visibleCount, setVisibleCount] = useState(8)
  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 4)
  }
  const handleShowLess = () => setVisibleCount(8)

  // State untuk urutan
  const [order, setOrder] = useState<'oldest' | 'newest'>('oldest')
  // State untuk membuka dropdown pilihan urutan
  const [orderButtonClick, setOrderButtonClick] = useState<boolean>(false)

  // Mengurutkan episode berdasarkan state order. 
  // Misal: jika 'oldest', array tetap sama (diasumsikan data sudah ascending); 
  // jika 'newest', array dibalik.
  const sortedEpisodes = useMemo(() => {
    if (Array.isArray(episodes)) {
      return order === 'oldest'
        ? [...episodes]
        : [...episodes].reverse()
    }
  }, [episodes, order])

  if (!episodes || episodes === undefined) {
    return (
      <div className='w-full py-10 flex items-center justify-center'>
        <h1 className="text-md md:text-lg xl:text-xl capitalize font-bold text-white">there are no episode yet</h1>
      </div>
    )
  }

  return (
    <section id="episodes" className="text-white">
      <ContentContainer>
        <div className="w-full flex flex-col items-start gap-10">
          {/* heading and order button */}
          <div className="w-full flex items-center justify-between">
            <h1 className='capitalize text-md md:text-lg font-bold'>episodes</h1>
            {/* order button */}
            <div className="relative">
              <button onClick={() => setOrderButtonClick(!orderButtonClick)} className='flex items-center gap-[10px] hover:cursor-pointer'>
                <ListIcon size={25} classname='text-white' />
                <span className='uppercase text-sm md:text-md'>{order}</span>
              </button>

              {/* order list */}
              {orderButtonClick && (
                <div className='z-30 absolute top-[34px] right-0 items-start w-fit h-fit bg-gray-800'>
                  <button onClick={() => {
                    setOrder('oldest')
                    setOrderButtonClick(false);
                  }} className='w-full cursor-pointer'>
                    <span className='block uppercase text-sm md:text-md rounded-[5px] py-2.5 p-4 hover:bg-gray-900 text-left'>oldest</span>
                  </button>
                  <button onClick={() => {
                    setOrder('newest')
                    setOrderButtonClick(false);
                  }} className='w-full cursor-pointer'>
                    <span className='block uppercase text-sm md:text-md rounded-[5px] py-2.5 p-4 hover:bg-gray-900 text-left'>newest</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* episode list */}
          <div className="w-full flex items-center justify-center">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'>
              {!data ? (
                <React.Fragment>
                  {Array.from({length:8}).map((_, idx:number) => (
                    <Skeleton className='w-[250px] md:w-[300px] lg:w-[200px] xl:w-[300px] h-[100px] md:h-[200px]' />
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {sortedEpisodes?.slice(0, visibleCount).map((item: any) => (
                    <EpisodeCard key={item?.episodeId} episode={item} coverImage={coverImage} animeTitle={animeTitle} />
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>

          {/* show more button */}
          {/* Jika jumlah data lebih banyak dari visibleCount, tampilkan tombol Show More */}
          {episodes.length > visibleCount ? (
            <div className='w-full flex items-center justify-center'>
              <button onClick={handleShowMore} className='cursor-pointer w-[80%]'>
                <span className='transition-all duration-300 ease-in-out block text-[.9rem] md:text-lg capitalize rounded-[5px] p-2.5 w-full border border-gray-400 hover:bg-orange-500 hover:border-none'
                >show more</span>
              </button>
            </div>
          ) : (
            <div className='w-full flex items-center justify-center'>
              <button onClick={handleShowLess} className='cursor-pointer w-[80%]'>
                <span className='transition-all duration-300 ease-in-out block text-[.9rem] md:text-lg capitalize rounded-[5px] p-2.5 w-full border border-gray-400 hover:bg-orange-500 text-white hover:border-orange-500'
                >show less</span>
              </button>
            </div>
          )}
        </div>
      </ContentContainer>
    </section>
  )
}

export default AnimeEpisodes