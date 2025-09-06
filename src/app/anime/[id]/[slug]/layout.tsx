import { GetAnimeDetail } from '@/functions/fetcher';
import React from 'react'

export async function generateMetadata({params}:{params:any}) {
  const { id } = await params;

  const animeData = await GetAnimeDetail(id);
  const animeTitle = animeData?.data?.title;

  return {
    title: animeTitle ? `${animeTitle} - Anime Paradise` : 'Anime Paradise - Discover and Watch Your Favourite Anime',
    description: animeData?.data?.synopsis ? animeData?.data?.synopsis : 'Embark on an anime adventure with Anime Paradise, your ultimate destination for watching a vast collection of anime series and movies. Delve into the captivating worlds of hit titles such as One Piece, Jujutsu Kaisen, Chainsaw Man, and Attack on Titan. Start your journey today and immerse yourself in the thrilling world of anime with Anime Paradise!'
  }
}

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default layout