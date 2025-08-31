import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
      <Image src={'/images/logo.png'} alt='logo' width={100} height={100} className='rounded-lg' />
    </Link>
  )
}

export default Logo