import React from 'react'

import ContentWrapper from '@/components/wrapper/ContentWrapper'
import MainWrapper from '@/components/wrapper/MainWrapper'

import { GetLatestReview } from '@/utils/fetcher'
import LatestReviewList from '@/components/listItems/LatestReviewList'

const page = async ({searchParams}:{searchParams:any}) => {
  const { page } = searchParams
  const latestAnimeReviews = await GetLatestReview({
    page: page
  });

  return (
    <MainWrapper>
      <ContentWrapper>
        <LatestReviewList initialData={latestAnimeReviews} url={`/reviews/anime?page=1`} />
      </ContentWrapper>
    </MainWrapper>
  )
}

export default page