'use client'
import { Box, Center } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "framer-motion"

import { MdOpenInFull } from "react-icons/md";
import { useAppDispatch } from '@/redux/store'
import { setShowAnimePicture } from '@/redux/slice/utilitySlice'

const MotionDiv = motion.div
const MotionCenter = motion.create(Center)

const glassmorphism = {
  background: 'rgba( 255, 255, 255, 0.15 )',
  boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
  backdropFilter: 'blur( 2px )',
  borderRadius: '10px',
}

const AnimePictureCard = ({data}:{data:any}) => {
  const dispatch = useAppDispatch();

  // State untuk src gambar dan counter reload agar tidak terjadi infinite loop
  const [imageSrc, setImageSrc] = useState(data?.jpg?.image_url)
  const [reloadCount, setReloadCount] = useState(0)

  const [hover, setHover] = useState<boolean>(false);

  const handleImageError = () => {
    // Misalnya kita batasi maksimal 3 kali reload
    if (reloadCount < 3) {
      setReloadCount(reloadCount + 1)
      // Tambahkan query param unik untuk menghindari cache
      setImageSrc(data?.jpg?.image_url + `?reload=${new Date().getTime()}`)
    }
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Box width={{base:'120px', md:'200px'}} height={{base:'200px', md:'280px'}} position={'relative'} borderRadius={'10px'} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Image src={imageSrc} alt='anime-images' fill onError={handleImageError} className='rounded-[10px]' />

        {hover && (
          <MotionCenter zIndex={20} position={'absolute'} top={0} left={0} width={'100%'} height={'100%'} cursor={'pointer'} style={glassmorphism} initial={{opacity:0}} animate={{opacity: hover ? 1 : 0}} transition={{duration: 0.3}} onClick={() => {
            dispatch(setShowAnimePicture({
              display: true,
              data: data?.jpg?.large_image_url,
            }))
          }}>
            <MdOpenInFull size={30} color='white' />
          </MotionCenter>
        )}
      </Box>
    </MotionDiv>
  )
}

export default AnimePictureCard