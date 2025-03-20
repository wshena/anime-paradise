'use client'
import React from 'react'
import ContentWrapper from '@/components/wrapper/ContentWrapper'
import MainWrapper from '@/components/wrapper/MainWrapper'
import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { IoBookmarkOutline } from 'react-icons/io5'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ProgressBar from '@/components/ProgressBar'

const Tabs = [
  {
    id: 1,
    title: 'watchlist',
    link: '/list/watchlist'
  },
  {
    id: 2,
    title: 'history',
    link: '/list/history'
  },
]

const layout = ({children}:{children:React.ReactNode}) => {
  const pathname = usePathname();

  return (
    <>
    <ProgressBar />
    <MainWrapper>
      <ContentWrapper>
        <Stack alignItems={'center'} gap={{base:'30px', md:'40px'}} paddingY={{ base: '30px', md: '50px' }}>
          <Heading as={'h1'} fontSize={{base:'1rem', md:'1.3rem', lg:'2rem'}} display={'flex'} alignItems={'center'} gap={'10px'}>
            <IoBookmarkOutline size={30} color='white' /> My List
          </Heading>
          <Center width={'100%'} borderBottom={'1px solid gray'}>
            <Flex alignItems={'center'}>
              {Tabs.map((item:any) => (
                <Link key={item.id} href={item.link}>
                  <Box padding={'1rem'} color={item.link === pathname ? 'white' : 'gray.500'} _hover={{color:'white', bgColor:'gray.800'}} cursor={'pointer'} textTransform={'uppercase'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1rem'}} bgColor={item.link === pathname ? 'gray.800' : ''} borderBottom={item.link === pathname ? '3px solid rgb(255, 100, 10)' : 'none'}>
                    <span>{item.title}</span>
                  </Box>
                </Link>
              ))}
            </Flex>
          </Center>
          {children}
        </Stack>
      </ContentWrapper>
    </MainWrapper>
    </>
  )
}

export default layout