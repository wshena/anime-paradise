import React from 'react'
import { slugToOriginal } from '@/functions';

export async function generateMetadata({params}:{params:any}) {
  const { slug } = await params;
  const animeTitle = slugToOriginal(slug, true);

  return {
    title: animeTitle ? `${animeTitle} - Anime Paradise` : 'Anime Paradise - Discover and Watch Your Favourite Anime',
    description: 'Embark on an anime adventure with Anime Paradise, your ultimate destination for watching a vast collection of anime series and movies. Delve into the captivating worlds of hit titles such as One Piece, Jujutsu Kaisen, Chainsaw Man, and Attack on Titan. Start your journey today and immerse yourself in the thrilling world of anime with Anime Paradise!'
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