'use client'
import { setProfileButtonClick } from '@/redux/slice/utilitySlice'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MdOutlinePerson3 } from 'react-icons/md'

const ProfileButton = () => {
  const dispatch = useAppDispatch();
  const {profileButtonClick} = useAppSelector((state:RootState) => state.utility);
  const {user} = useAppSelector((state:RootState) => state.auth);

  // username
  const username = user?.email?.split("@")[0]

  return (
    <button onClick={() => {
      dispatch(setProfileButtonClick(!profileButtonClick))
    }}>
      <Box
        width={'fit-content'}
        padding={{base:'.7rem', md:'1rem'}}
        _hover={{
          backgroundColor:'gray.800',
          cursor:'pointer'
        }} 
        display={'block'}
        backgroundColor={profileButtonClick ? 'gray.800' : ''}
      >
        {(user && Object.keys(user).length > 0) ? (
          <Flex alignItems={'center'} gap={'8px'}>
            <MdOutlinePerson3 size={20} color='white' />
            <Text textTransform={'capitalize'}>{username}</Text>
          </Flex>
        ) : (
          <MdOutlinePerson3 size={20} color='white' />
        )}
      </Box>
    </button>
  )
}

export default ProfileButton