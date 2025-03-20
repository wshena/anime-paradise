import React from 'react'
import Link from 'next/link'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'

import { HeaderNavigation } from '@/utils/const'

import Logo from './Logo'
import ContentWrapper from './wrapper/ContentWrapper'
import ProfileButton from './buttons/ProfileButton'

import { IoBookmarkOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineMenuFold } from "react-icons/ai";
import MobileNavButton from './buttons/MobileNavButton'

const Navbar = () => {
  return (
    <header className='fixed top-0 left-0 z-50 bg-[#47474a] w-full'>
      <ContentWrapper>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <HStack width={'100%'} gap={'25px'}>
            <Logo />
            <Flex display={{base:'none', lg:'flex'}} alignItems={'center'} gap={'15px'}>
              {HeaderNavigation?.map((item:any) => (
                <Link key={item?.label} href={item?.link}>
                  <Text fontSize={'1rem'} color={'gray.300'} _hover={{color:'white'}}>{item?.label}</Text>
                </Link>
              ))}
            </Flex>
          </HStack>
          <HStack alignItems={'center'} gap={'0px'}>
            {/* search button */}
            <Link href={'/search'}>
              <Box padding={{base:'.7rem', md:'1rem'}} _hover={{
                backgroundColor:'gray.800',
                cursor:'pointer'
              }} display={'block'}>
                <HiMiniMagnifyingGlass size={20} color='white' /> 
              </Box>
            </Link>
            {/* watchlist button */}
            <Link href={'/list/watchlist'}>
              <Box padding={{base:'.7rem', md:'1rem'}} _hover={{
                backgroundColor:'gray.800',
                cursor:'pointer'
              }} display={{base:'none', lg:'block'}}>
                <IoBookmarkOutline size={20} color='white' /> 
              </Box>
            </Link>
            {/* profile button */}
            <ProfileButton />

            {/* mobile nav menu */}
            <MobileNavButton />
          </HStack>
        </Flex>
      </ContentWrapper>
    </header>
  )
}

export default Navbar