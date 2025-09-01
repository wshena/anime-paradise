import Image from 'next/image'
import React from 'react'
import { H3 } from './typography'
import Link from 'next/link'

const ViewAllCollection = () => {
  return (
    <section id="view-more" className="py-15 lg:py-20 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-5">
        <Image src={'/images/yuzu.png'} alt='yuzu' width={250} height={100} loading='lazy' />
        <div className="-space-y-1 text-center">
          <H3 text='Still looking for something to watch?' />
          <H3 text='Check out our full library' />
        </div>
        <Link href={'/animes/popular'}>
          <button aria-label='view more button' className='border-2 border-orange-500 text-orange-500 py-2 px-5 lg:py-3 lg:px-8'>
            <span aria-label='name'>View More</span>
          </button>
        </Link>
      </div>
    </section>
  )
}

export default ViewAllCollection