import { Box } from '@chakra-ui/react'
import React from 'react'

const ContentWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <Box maxWidth={'1440px'} marginX={'auto'} paddingX={{base:'20px', md:'50px', "2xl":'0px'}}>
      {children}
    </Box>
  )
}

export default ContentWrapper