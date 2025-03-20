import React from 'react'
import { Box } from '@chakra-ui/react'

import SmallReviewCardCarousel from '../carousel/SmallReviewCardCarousel'

const AnimeReviews = async ({id, data}:{id:number, data:any}) => {
  if (data?.data.length <= 0) {
    return
  }

  return (
    <Box width={'100%'}>
      <SmallReviewCardCarousel initialData={data} label='What People Say' url={`/anime/${id}/reviews`} />
    </Box>
  )
}

export default AnimeReviews