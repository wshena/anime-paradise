import React from 'react'
import Link from 'next/link'
import { Heading } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Link href={'/'}>
      <Heading cursor={'pointer'} fontWeight={'bold'} fontSize={'1rem'} textTransform={'uppercase'} color={'rgb(255, 100, 10)'} _hover={{color:'white'}}>Anime Paradise</Heading>
    </Link>
  )
}

export default Logo