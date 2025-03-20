'use client'
import React, { useState } from 'react'
import { Center, Grid, Heading, Stack, Button } from '@chakra-ui/react'
import { useSWRCaching } from '@/utils/useSWR'
import CharacterCards from '../cards/CharacterCards'

const CharacterList = ({ initialData, url }: { initialData: any, url: string }) => {
  const { data, isLoading, error } = useSWRCaching(initialData, url)
  const list = data?.data || []

  // State untuk menentukan jumlah elemen yang akan ditampilkan
  const [visibleCount, setVisibleCount] = useState(10)

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5)
  }

  return (
    <Stack width={'100%'} gap={'20px'}>
      <Heading
        as={'h1'}
        fontWeight={'bold'}
        textTransform={'capitalize'}
        fontSize={{ base: '1rem', md: '2rem', lg: '2rem' }}
        fontStyle={'italic'}
      >
        Characters
      </Heading>
      <Center width={'100%'}>
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
          gap={{ base: '15px', md: '20px' }}
          width={{ base: '100%', xl: '100%' }}
        >
          {list.slice(0, visibleCount).map((item: any) => (
            <CharacterCards key={item.character?.mal_id} data={item} />
          ))}
        </Grid>
      </Center>
      {/* Jika jumlah data lebih banyak dari visibleCount, tampilkan tombol Show More */}
      {list.length > visibleCount && (
        <Center width={'100%'}>
          <button onClick={handleShowMore} className='cursor-pointer w-[80%]'>
            <Heading
              as="span"
              display="block"
              fontSize={{ base: '.9rem', md: '1rem' }}
              textTransform="capitalize"
              rounded="5px"
              padding={'.6rem'}
              width={'100%'}
              border={'1px solid gray'}
              _hover={{ bg: 'rgb(255, 100, 10)', border:'1px solid rgb(255, 100, 10)' }}
              className='transition-all duration-300 ease-in-out'
            >
              show more
            </Heading>
          </button>
        </Center>
      )}
    </Stack>
  )
}

export default CharacterList
