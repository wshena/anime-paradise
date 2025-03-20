'use client'
import { setMobileNavClick } from '@/redux/slice/utilitySlice'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineMenuFold } from 'react-icons/ai'

const MobileNavButton = () => {
  const dispatch = useAppDispatch();
  const {mobileNavClick} = useAppSelector((state:RootState) => state.utility);

  return (
    <button onClick={() => {
      dispatch(setMobileNavClick(!mobileNavClick));
    }}>
      <Box padding={{base:'.7rem', md:'1rem'}} _hover={{
        backgroundColor:'gray.800',
        cursor:'pointer',
      }} display={{base:'block', lg:'none'}} backgroundColor={mobileNavClick ? 'gray.800' : ''} >
        <AiOutlineMenuFold size={20} color='white' />
      </Box>
    </button>
  )
}

export default MobileNavButton