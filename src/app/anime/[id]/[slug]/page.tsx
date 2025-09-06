import AnimeDetail from '@/components/AnimeDetail';
import { GetAnimeCharacter, GetAnimeDetail, GetAnimeFromAnimeAPI, GetAnimePictures, GetAnimeRecomendations, GetAnimeReviews } from '@/functions/fetcher';
import React from 'react'

const page = async ({params}:{params:any}) => {
  const { id, slug } = await params;
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
  console.log(anime);

  return (
    <main className=''>
      <AnimeDetail anime={anime} animeId={anime?.data?.mal_id} />
    </main>
  )
}

export default page