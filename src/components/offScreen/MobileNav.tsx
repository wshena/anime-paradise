'use client'
import { setMobileNavClick } from '@/redux/slice/utilitySlice'
import { useAppDispatch } from '@/redux/store'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Logo from '../Logo'
import { HeaderNavigation } from '@/utils/const'
import Link from 'next/link'

const MobileNav = () => {
  const dispatch = useAppDispatch();

  return (
    <Box position={'absolute'} top={'60px'} left={'0px'} width={'100%'} height={'100%'} zIndex={50} cursor={'pointer'} className='bg-black/80' onClick={(e:any) => {
      dispatch(setMobileNavClick(false));
    }}>
      <Flex width={'100%'} justifyContent={'flex-end'} height={'100%'}>
        <Box width={{base:'100%', md:'300px'}} backgroundColor={'gray.800'} paddingBottom={'60px'}>
          <Stack alignItems={'center'} justifyContent={'space-between'} width={'100%'} height={'100%'}>
            <Stack alignItems={'start'} width={'100%'}>
              {HeaderNavigation?.map((item:any) => (
                <Link key={item.label} href={item.link} className='w-full'>
                  <Text _hover={{backgroundColor:'gray.700'}} padding={'1rem'}>{item.label}</Text>
                </Link>
              ))}
            </Stack>
            <Logo />
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default MobileNav