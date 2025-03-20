import React from 'react'

import { GetAnimeEpisodesFromAnimeAPI } from '@/utils/fetcher'

import EpisodeList from '../listItems/EpisodeList'

const AnimeEpisodes = async ({anime, image}:{anime:any, image:string}) => {
  const id = anime?.id?.split('?')[0]
  const animeEpisodes = await GetAnimeEpisodesFromAnimeAPI(id);
  
  return (
    <EpisodeList initialData={animeEpisodes} url={`/episodes/${id}`} image={image} />
  )
}

export default AnimeEpisodes