import AnimeDetail from '@/components/AnimeDetail';
import AnimeEpisodes from '@/components/AnimeEpisodes';
import AnimeRecomendations from '@/components/AnimeRecomendations';
import { GetAnimeCharacter, GetAnimeDetail, GetAnimeFromAnimeAPI, GetAnimePictures, GetAnimeRecomendations, GetAnimeReviews } from '@/functions/fetcher';
import React from 'react'

const page = async ({params}:{params:any}) => {
  const { id, slug } = await params;
  const [anime, animeRecomendations, animeSearchFromAnimeAPi] = await Promise.all([
    GetAnimeDetail(id),    
    GetAnimeRecomendations(id),
    GetAnimeFromAnimeAPI({
      keyword: `"${slug}"`,
      page: 1,
    })
  ]);
  
  const animeFromAnimeApi = animeSearchFromAnimeAPi?.animes[0];
  const animeFromAnimeApiId = animeFromAnimeApi?.id;
  const coverImage = anime?.data && anime?.data.images?.jpg?.large_image_url;
  console.log(animeFromAnimeApi);
  console.log(animeRecomendations)
  return (
    <main className='bg-black'>
      <AnimeDetail anime={anime} animeId={anime?.data?.mal_id} />
      <AnimeEpisodes animeId={animeFromAnimeApi?.id} coverImage={coverImage} animeTitle={anime?.data?.title} />
      <AnimeRecomendations initialData={animeRecomendations} animeId={id} />
    </main>
  )
}

export default page