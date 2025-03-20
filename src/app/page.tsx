import Link from "next/link";
import { Flex, Heading, Stack, VStack } from "@chakra-ui/react";

import JumbotronCarousel from "@/components/carousel/JumbotronCarousel";
import ContentWrapper from "@/components/wrapper/ContentWrapper";
import MainWrapper from "@/components/wrapper/MainWrapper";
import CardCarousel from "@/components/carousel/CardCarousel";
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import ReviewsCard from "@/components/cards/ReviewsCard";
import BannerLink from "@/components/BannerLink";
import ViewAllCollections from "@/components/ViewAllCollections";

import { GetAnimeList, GetLatestReview, GetSeasonsNowList, GetTopAnime, GetUpcomingSeasonsAnime } from "@/utils/fetcher";
import SingleAnimeBlock from "@/components/SingleAnimeBlock";
import { animeBlackClover, animeDragonballDaima } from "@/utils/const";

const LatestReview = ({latestReviews, sliceLatestReviews}:{latestReviews:any, sliceLatestReviews:any}) => {
  return (
    <Stack alignItems={'start'} gap={'20px'} width={'100%'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={{base:'1rem', md:'2rem', lg:'2rem'}} fontStyle={'italic'}>Latest Reviews</Heading>
        <Link href={'/reviews?page=1'}>
          <span className="text-[1rem] text-gray-500 hover:text-white">
            View All
          </span>
        </Link>
      </Flex>
      {!latestReviews || latestReviews?.length <= 0 ? (
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          {Array.from({length:4}).map((_, idx:number) => (
            <SkeletonLoader key={idx} dimension={{
              width: {base:'120px', md:'200px'},
              height: {base:'200px', md:'280px'}
            }} />
          ))}
        </Flex>
      ) : (
        <>
          {sliceLatestReviews?.map((item:any) => (
            <ReviewsCard data={item} key={item?.mal_id} />
          ))}
        </>
      )}
    </Stack>
  )
}

const CarouselSection = ({data, label, url}:{data:any, label:string, url:string}) => {
  return (
    <>
      {!data ? (
        <Flex width={'100%'} alignItems={'center'} gap={'20px'}>
          {Array.from({length:5}).map((_,idx:number) => (
            <SkeletonLoader key={idx} dimension={{
              width: {base:'120px', md:'200px'},
              height: {base:'200px', md:'280px'}
            }} />
          ))}
        </Flex>
      ) : (
        <CardCarousel initialData={data?.data} label={label} url={url} />
      )}
    </>
  )
};

export default async function Home() {
  const allListThisSeasons = await GetSeasonsNowList();
  const latestReview = await GetLatestReview({ limit: 2 });
  const sliceLatestReviews = latestReview?.data?.slice(0,2);
  const mostPopularAnime = await GetTopAnime({
    filter: 'bypopularity'
  });
  const mostPopularMovie = await GetTopAnime({
    filter: 'bypopularity',
    type: 'movie'
  });
  const latestCompleteAnime = await GetAnimeList({
    status: 'complete',
    order_by: 'end_date',
    sort: 'desc'
  });
  const upcomingSeasonAnime = await GetUpcomingSeasonsAnime();
  
  return (
    <MainWrapper>
      {(!allListThisSeasons) ? (
        <SkeletonLoader dimension={{ width: '100vw', height: { base: '400px', md: '500px' } }} />
      ) : (
        <JumbotronCarousel initialData={allListThisSeasons} />
      )}
      <ContentWrapper>
        <VStack alignItems={'center'} gap={{base:'20px', md:'50px'}} width={'100%'} paddingY={{base:'30px', md:'50px'}}>
          {/* this season */}
          <CarouselSection data={allListThisSeasons} label="Latest Series From The Winter Season" url="/seasons/now" />
          {/* most popular */}
          <CarouselSection data={mostPopularAnime} label="Most Popular" url="/top/anime?filter=bypopularity" />
          {/* latest complete */}
          <CarouselSection data={latestCompleteAnime} label="Explore the Latest Fully Completed Anime" url="/anime?status=complete&order_by=end_date&sort=desc" />
          
          <BannerLink image="/image/DemonSlayer-InfinityMovie-Launch-Banner-2100x700-EN.avif" url={'https://www.demonslayer-movie.com/?utm_source=cap_cr&utm_medium=standard_banner_2&utm_campaign=demon-slayer-infinity-castle_en&referrer=cap_cr_standard_banner_2_demon-slayer-infinity-castle'} />
          <SingleAnimeBlock data={animeDragonballDaima} image="/image/dargonBallDaima.avif" />
          <BannerLink image="/image/Zenshu-S1-KV1-Banner-2100x700-EN.avif" url={'http://localhost:3000/anime/58502/zenshuu'} />
          <SingleAnimeBlock data={animeBlackClover} image="/image/blackClover.avif" />
          {/* most popular movies */}
          <CarouselSection data={mostPopularMovie} label="Watch Popular Movies" url="/top/anime?filter=bypopularity&type=movie" />
          {/* upcoming season anime */}
          <CarouselSection data={upcomingSeasonAnime} label="Upcoming Season Anime" url="/seasons/upcoming" />
          
          <LatestReview latestReviews={latestReview} sliceLatestReviews={sliceLatestReviews} />
          <ViewAllCollections />
        </VStack>
      </ContentWrapper>
    </MainWrapper>
  );
}
