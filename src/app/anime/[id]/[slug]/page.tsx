import React from 'react'
import { Stack } from '@chakra-ui/react';

import AnimeDetail from '@/components/animeDetails/AnimeDetail';
import ContentWrapper from '@/components/wrapper/ContentWrapper'
import MainWrapper from '@/components/wrapper/MainWrapper'
import AnimeRecomendations from '@/components/animeDetails/AnimeRecomendations';
import AnimeReviews from '@/components/animeDetails/AnimeReviews';
import CharacterList from '@/components/listItems/CharacterList';
import AnimeEpisodes from '@/components/animeDetails/AnimeEpisodes';
import AnimePictures from '@/components/animeDetails/AnimePictures';

import { GetAnimeCharacter, GetAnimeDetail, GetAnimeFromAnimeAPI, GetAnimePictures, GetAnimeRecomendations, GetAnimeReviews } from '@/utils/fetcher';

const page = async ({params}:{params:any}) => {
  const {id, slug} = params;
  const [anime, characterList, animeReviews, animePictures, animeRecomendations, animeSearchFromAnimeAPi] = await Promise.all([
    GetAnimeDetail(id),
    GetAnimeCharacter(id),
    GetAnimeReviews(id),
    GetAnimePictures(id),
    GetAnimeRecomendations(id),
    GetAnimeFromAnimeAPI({
      keyword: `"${slug}"`,
      page: 1,
    })
  ]);
  
  const animeFromAnimeApi = animeSearchFromAnimeAPi?.animes[0];
  
  return (
    <MainWrapper>
      <ContentWrapper>
        <Stack alignItems={'start'} gap={{base:'20px', md:'30px'}} paddingY={{base:'30px', md:'50px'}}>
          <AnimeDetail initialData={anime} id={id} />
          <AnimeEpisodes anime={animeFromAnimeApi} image={animeFromAnimeApi?.img} />
          <AnimeReviews id={id} data={animeReviews} />
          <CharacterList initialData={characterList} url={`/anime/${id}/characters`} />
          <AnimePictures id={id} data={animePictures} />
          <AnimeRecomendations id={id} data={animeRecomendations} />
        </Stack>
      </ContentWrapper>
    </MainWrapper>
  )
}

export default page