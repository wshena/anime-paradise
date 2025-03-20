'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { motion } from "framer-motion"

import { createSlug, truncateTitle } from '@/utils/functions'
import SkeletonLoader from '../loader/SkeletonLoader'

interface AnimeCardProps {
  data: {
    id: number,
    title: string,
    image: string
  }
}

const MotionDiv = motion.div

const AnimeCard = ({ data }: AnimeCardProps) => {
  const [hover, setHover] = useState(false)
  const slug = createSlug(data?.title)

  // State untuk src gambar dan counter reload agar tidak terjadi infinite loop
  const [imageSrc, setImageSrc] = useState(data?.image)
  const [reloadCount, setReloadCount] = useState(0)

  const handleImageError = () => {
    // Misalnya kita batasi maksimal 3 kali reload
    if (reloadCount < 3) {
      setReloadCount(reloadCount + 1)
      // Tambahkan query param unik untuk menghindari cache
      setImageSrc(data?.image + `?reload=${new Date().getTime()}`)
    }
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className='w-fit'
    >
      {!data ? (
        <SkeletonLoader dimension={{
          width: {base:'120px', md:'200px'},
          height: {base:'200px', md:'280px'}
        }} />
      ) : (
        <Link
          href={`/anime/${data?.id}/${slug}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className='block w-fit'
        >
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
            }}
            className='w-[120px] md:w-[200px] h-[200px] md:h-[280px] relative'
          >
            <Image
              src={imageSrc}
              fill
              alt={data?.title}
              onError={handleImageError}
              className='rounded-[10px]'
            />
          </motion.div>
          <Box paddingY={'.7rem'} className='w-[120px] md:w-[200px]'>
            <Heading
              as={'h2'}
              fontWeight={'bold'}
              fontSize={{ base: '.9rem', md: '.9rem' }}
              color={hover ? 'rgb(255, 100, 10)' : 'white'}
              className='transition-color duration-300 ease-in-out'
            >
              {truncateTitle(data?.title, 25)}
            </Heading>
          </Box>
        </Link>
      )}
    </MotionDiv>
  )
}

export default AnimeCard
