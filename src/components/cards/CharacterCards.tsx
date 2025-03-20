'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'

// Buat motion component dari Stack
const MotionStack = motion(Stack)

const CharacterCards = ({ data }: { data: any }) => {
  // State untuk src gambar dan counter reload agar tidak terjadi infinite loop
  const [imageSrc, setImageSrc] = useState(data?.character?.images?.jpg?.image_url)
  const [reloadCount, setReloadCount] = useState(0)

  const handleImageError = () => {
    // Misalnya kita batasi maksimal 3 kali reload
    if (reloadCount < 3) {
      setReloadCount(reloadCount + 1)
      // Tambahkan query param unik untuk menghindari cache
      setImageSrc(data?.character?.images?.jpg?.image_url + `?reload=${new Date().getTime()}`)
    }
  }

  return (
    <MotionStack
      // Animasi masuk ke view
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      alignItems="start"
      position="relative"
      gap="10px"
      width="fit-content"
    >
      <Box
        width={{ base: '120px', md: '200px' }}
        height={{ base: '200px', md: '280px' }}
        position="relative"
        borderRadius="10px"
      >
        <Image
          src={imageSrc}
          fill
          alt={data?.character?.name}
          onError={handleImageError}
          className="rounded-[10px]"
        />
      </Box>
      <Heading
        as="h2"
        fontWeight="bold"
        fontSize={{ base: '.9rem', md: '.9rem' }}
        color={'white'}
        className="transition-color duration-300 ease-in-out"
      >
        {data?.character?.name}
      </Heading>
    </MotionStack>
  )
}

export default CharacterCards
