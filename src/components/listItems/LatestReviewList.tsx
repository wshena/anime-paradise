'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Center, Flex, Heading, Stack } from '@chakra-ui/react'

import { useSWRCaching } from '@/utils/useSWR'
import ReviewsCard from '../cards/ReviewsCard'
import SkeletonLoader from '../loader/SkeletonLoader'

const LatestReviewList = ({ initialData, url }: { initialData: any, url: string }) => {
  // Ambil parameter 'page' dari query string
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  // Periksa apakah ada halaman berikutnya berdasarkan data API
  const nextPage = (initialData?.pagination?.has_next_page) ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null

  // Ambil data menggunakan SWR dengan url dinamis (pastikan URL juga update jika perlu)
  const { data, isLoading } = useSWRCaching(initialData, `/reviews/anime?page=${currentPage}`)

  return (
    <Stack width="100%" gap={{ base: '30px', md: '40px', xl: '50px' }} paddingY={{ base: '30px', md: '50px' }}>
      <Flex flexDir={{base:'column', md:'row'}} alignItems="center" justifyContent="space-between" width="100%">
        <Heading as="h1" fontWeight="bold" fontSize={{ base: '1.5rem', md: '2rem', xl: '3rem' }}>
          Latest Reviews
        </Heading>
        {/* next prev button */}
        <Flex alignItems="center" gap="20px">
          {prevPage ? (
            <Link href={`/reviews?page=${prevPage}`}>
              <Heading as="span" color={'white'} _hover={{borderBottom:'1px solid white'}} fontSize={{base:'1rem', md:'1.3rem'}}>
                Prev
              </Heading>
            </Link>
          ) : (
            <Heading as="span" cursor="not-allowed" color={'gray.700'} fontSize={{base:'1rem', md:'1.3rem'}}>
              Prev
            </Heading>
          )}
          {nextPage ? (
            <Link href={`/reviews?page=${nextPage}`}>
              <Heading as="span" color={'white'} _hover={{borderBottom:'1px solid white'}} fontSize={{base:'1rem', md:'1.3rem'}}>
                Next
              </Heading>
            </Link>
          ) : (
            <Heading as="span" cursor="not-allowed" color={'gray.700'} fontSize={{base:'1rem', md:'1.3rem'}}>
              Next
            </Heading>
          )}
        </Flex>
      </Flex>
      <Stack alignItems="start" gap={{ base: '20px', md: '30px' }}>
        {isLoading ? (
          <>
            {Array.from({length:4}).map((_,idx:number) => (
              <SkeletonLoader key={idx} dimension={{
                width: '100%',
                height: '312px'
              }} />
            ))}
          </>
        ) : (
          <>
            {data?.data?.map((item: any) => (
              <ReviewsCard key={item?.mal_id} data={item} />
            ))}
          </>
        )}
      </Stack>
      
      <Center justifyContent={'flex-end'}>
        {/* next prev button */}
        <Flex alignItems="center" gap="20px">
          {prevPage ? (
            <Link href={`/reviews?page=${prevPage}`}>
              <Heading as="span" color={'white'} _hover={{borderBottom:'1px solid white'}} fontSize={{base:'1rem', md:'1.3rem'}}>
                Prev
              </Heading>
            </Link>
          ) : (
            <Heading as="span" cursor="not-allowed" color={'gray.700'} fontSize={{base:'1rem', md:'1.3rem'}}>
              Prev
            </Heading>
          )}
          {nextPage ? (
            <Link href={`/reviews?page=${nextPage}`}>
              <Heading as="span" color={'white'} _hover={{borderBottom:'1px solid white'}} fontSize={{base:'1rem', md:'1.3rem'}}>
                Next
              </Heading>
            </Link>
          ) : (
            <Heading as="span" cursor="not-allowed" color={'gray.700'} fontSize={{base:'1rem', md:'1.3rem'}}>
              Next
            </Heading>
          )}
        </Flex>
      </Center>
    </Stack>
  )
}

export default LatestReviewList