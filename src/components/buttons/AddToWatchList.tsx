'use client'
import React from 'react'
import { Heading } from '@chakra-ui/react'

import { IoBookmarkOutline, IoBookmarkSharp } from 'react-icons/io5'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { addToWatchlist, removeFromWatchlist } from '@/redux/slice/watchlist'
import { setAlert } from '@/redux/slice/alert'

const AddToWatchList = ({animeData}:{animeData:any}) => {
  const dispatch = useAppDispatch();
  const {watchlist} = useAppSelector((state:RootState) => state.watchlist);
  const {user} = useAppSelector((state:RootState) => state.auth);

  const thisUserWatchlist = watchlist?.find((item:any) => item.userId === user?.id);
  const isAnimeAlreadyAddToWatchList = thisUserWatchlist?.userWatchlist?.find((item:any) => item?.mal_id === animeData?.mal_id);

  const handleAddWatchList = () => {
    if (Object.keys(user).length > 0) {
      if (isAnimeAlreadyAddToWatchList) {
        dispatch(removeFromWatchlist({
          userId: user?.id,
          animeId: animeData?.mal_id
        }));
        dispatch(setAlert({
          label:'Success remove from your watchlist',
          type:'success',
        }));
      } else {
        dispatch(addToWatchlist({
          userId: user?.id,
          anime: animeData
        }));
        dispatch(setAlert({
          label:'Success added Anime to your watchlist',
          type:'success',
        }))
      }

    } else {
      dispatch(setAlert({
        label:'You must login first to add to your watchlist',
        type:'error',
      }))
    }
  };

  return (
    <button onClick={handleAddWatchList} className='cursor-pointer' aria-label='Add to Watchlist'>
      <Heading as={'span'} paddingY={{base:'5px', lg:'10px'}} paddingX={{base:'.7rem', md:'.6rem'}} border={'1px solid rgb(255, 100, 10) '} color={'rgb(255, 100, 10)'} backgroundColor={'black'} display={'flex'} alignItems={'center'} gap={'10px'} fontSize={{base:'.7rem', lg:'1rem'}}>
        {isAnimeAlreadyAddToWatchList ? (
          <>
            <IoBookmarkSharp size={20} color='rgb(255, 100, 10)' />
            Already on Watchlist
          </>
        ) : (
          <>
            <IoBookmarkOutline size={20} color='rgb(255, 100, 10)' />
            Add to Watchlist
          </>
        )}
      </Heading>
    </button>
  )
}

export default AddToWatchList