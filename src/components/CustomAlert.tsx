import { Center, Alert, Box } from '@chakra-ui/react'
import React from 'react'

const CustomAlert = ({status, title}:{status:'info'|'error'|'warning'|'success', title:string}) => {
  return (
    <Center position={'fixed'} top={'70px'} left={'0px'} width={'100%'}>
      <Box width={{base:'50%', md:'30%'}}>
        <Alert.Root status={status} title={title} padding={'.7rem'} fontSize={'1rem'}>
          <Alert.Indicator />
          <Alert.Title>{title}</Alert.Title>
        </Alert.Root>
      </Box>
    </Center>
  )
}

export default CustomAlert