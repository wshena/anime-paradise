'use client'
import { setProfileButtonClick } from '@/redux/slice/utilitySlice';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'
import Logo from '../Logo';
import LogoutButton from '../buttons/LogoutButton';

const ProfileLink = ({label, desc, url}:{label:string, desc:string, url:string}) => {
  return (
    <Link href={url}>
      <Stack width={'100%'} gap={'3px'} _hover={{backgroundColor:'gray.700'}} padding={'1rem'}>
        <Text fontSize={'1rem'} color={'white'} textTransform={'capitalize'}>{label}</Text>
        <Text fontSize={'.9rem'} color={'gray.400'}>{desc}</Text>
      </Stack>
    </Link>
  )
}

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state:RootState) => state.auth);

  return (
    <Box position={'absolute'} top={'60px'} left={'0px'} width={'100%'} height={'100%'} zIndex={50} cursor={'pointer'} className='bg-black/80' onClick={(e:any) => {
      dispatch(setProfileButtonClick(false));
    }}>
      <Flex width={'100%'} justifyContent={'flex-end'} height={'100%'}>
        <Box width={{base:'100%', md:'300px'}} backgroundColor={'gray.800'} paddingBottom={'60px'}>
          <Stack alignItems={'center'} justifyContent={'space-between'} width={'100%'} height={'100%'}>
            <Box width={'100%'}>
              {(user && Object.keys(user).length > 0) ? (
                <>
                  <ProfileLink label='Watchlist' desc='Custom your watchlist' url='/list/watchlist' />
                  <ProfileLink label='History' desc='View your previous watch' url='/list/history' />
                  <LogoutButton />
                </>              
              ) : (
                <>
                  <ProfileLink label='create account' desc='Join for free' url='/auth/signin' />
                  <ProfileLink label='Log in' desc='Already join Anime Paradise? Welcome back.' url='/auth/login' />
                </>
              )}
            </Box>
            <Logo />
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default ProfileMenu