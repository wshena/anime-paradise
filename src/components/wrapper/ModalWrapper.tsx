import { Center } from '@chakra-ui/react'
import React from 'react'

const ModalWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <Center
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height={'100%'}
      zIndex={9999}
      paddingY={{base:'20px', md:'50px'}}
      className='bg-black/90'
    >
      {children}
    </Center>
  )
}

export default ModalWrapper