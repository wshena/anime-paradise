'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { FaPlay } from "react-icons/fa";
import SkeletonLoader from '../loader/SkeletonLoader'
import { truncateTitle } from '@/utils/functions'

const MotionCenter = motion.create(Center);
const glassmorphism = {
  background: 'rgba(0, 0, 0, 0.6)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  backdropFilter: 'blur( 2px )',
}

type EpisodeCardProps = {
  episode: any,
  image: string
}

const EpisodeCard = ({ data }: { data: EpisodeCardProps }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Center width={'100%'}>
      <Box width={'fit-content'}>
        {!data ? (
          <SkeletonLoader dimension={{
            width: { base: '250px', md: '300px', lg: '280px', xl: '300px' },
            height: { base: '100px', md: '150px' }
          }} />
        ) : (
        <Link 
            href={`/watch/${data?.episode?.episodeId}`} 
            className='block w-fit relative' 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
          >
            {hover && (
              <MotionCenter 
                zIndex={20} 
                position={'absolute'} 
                top={0} 
                left={0} 
                width={'100%'} 
                height={'100%'} 
                style={glassmorphism} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: hover ? 1 : 0 }} 
                transition={{ duration: 0.3 }}
              >
                <Stack 
                  alignItems={'center'} 
                  width={'100%'}
                  className='flex flex-col items-center gap-[10px] cursor-pointer'
                >
                  <FaPlay size={35} color='white' />
                  <Heading as={'span'} fontSize={'1rem'} color={'white'}>
                    Play
                  </Heading>
                </Stack>
              </MotionCenter>
            )}
            <Stack width={{ base: '250px', md: '300px', lg: '280px', xl: '300px' }}>
              <Box 
                width={'100%'} 
                height={{ base: '100px', md: '150px' }} 
                position={'relative'} 
                backgroundImage={`url("${data?.image}")`} 
                backgroundPosition={'center'} 
                backgroundSize={'cover'}
                className='border'
              >
              </Box>
              <Heading
                as={'h2'}
                fontWeight={'bold'}
                fontSize={{ base: '.9rem', md: '.9rem' }}
                color={'white'}
                className='transition-color duration-300 ease-in-out'
              >
                Episode {data?.episode?.episodeNo} : {truncateTitle(data?.episode?.name, 25)}
              </Heading>
            </Stack>
        </Link>
        )}
      </Box>
    </Center>
  )
}

export default EpisodeCard;
