'use client'
import React, { useEffect } from 'react'
import Logo from '@/components/Logo'
import { Center, Stack } from '@chakra-ui/react'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import CustomAlert from '@/components/CustomAlert'
import { setAlert } from '@/redux/slice/alert'
import ProgressBar from '@/components/ProgressBar'

const layout = ({children}:{children:React.ReactNode}) => {
  const dispatch = useAppDispatch();
  const {alert} = useAppSelector((state:RootState) => state.alert);

  useEffect(() => {
    if (alert.label === '') return;
    
    const timer = setTimeout(() => {
      dispatch(setAlert({
        label: '',
        message: '',
        type: 'info'
      }))
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <>
    <ProgressBar />
    <Center width={'100%'} paddingTop={'100px'} paddingBottom={'50px'} position={'relative'}>
      {alert.label !== '' && (
        <CustomAlert status={alert.type} title={alert.label} />
      )}
      <Center zIndex={50} bgColor={'black'} width={'100%'} position={'fixed'} top={'0px'}>
        <Logo />
      </Center>
      <Stack alignItems={'center'} width={{base:'100%', md:'500px'}} gap={{base:'50px', lg:'80px'}} paddingX={{base:'20px', md:'0px'}}>
        {children}
      </Stack>
    </Center>
    </>
  )
}

export default layout