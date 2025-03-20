import React from 'react'
import AnimePictureList from '../listItems/AnimePictureList';

const AnimePictures = async ({id, data}:{id:number, data:any}) => {
  return (
    <AnimePictureList initialData={data} url={`/anime/${id}/pictures`} />
  )
}

export default AnimePictures