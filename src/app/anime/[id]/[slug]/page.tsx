import React from 'react'

const page = async ({params}:{params:any}) => {
  const { id, slug } = await params;

  return (
    <main className='py-40'>
      <h1>id: {id}</h1>
      <h1>slug: {slug}</h1>
    </main>
  )
}

export default page