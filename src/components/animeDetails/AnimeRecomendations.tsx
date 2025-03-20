import React from 'react'
import { Box } from '@chakra-ui/react'

import { GetAnimeRecomendations } from '@/utils/fetcher'

import CardCarousel from '../carousel/CardCarousel'

const AnimeRecomendations = async ({id, data}:{id:number, data?:any}) => {
  const animeRecomendation = await GetAnimeRecomendations(id)

  return (
    <Box width={'100%'}>
      <CardCarousel initialData={data ? data : animeRecomendation} url={`/anime/${id}/recommendations`} label='More Like This' />
    </Box>
  )
}

export default AnimeRecomendations