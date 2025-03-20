import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerLink = ({url, image}:{url:string, image:string}) => {
  return (
    <Link href={url} target="blank" className="block">
      <Image src={image} alt={image} width={700} height={400} className="w-[100%] h-[350px] md:h-[350px]" loading="lazy" />
    </Link>
  )
}

export default BannerLink