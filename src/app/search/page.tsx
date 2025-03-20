import SearchForm from '@/components/SearchForm'
import SearchResult from '@/components/SearchResult'
import ContentWrapper from '@/components/wrapper/ContentWrapper'
import MainWrapper from '@/components/wrapper/MainWrapper'
import { Stack } from '@chakra-ui/react'
import React from 'react'

const page = () => {
  return (
    <MainWrapper>
      <ContentWrapper>
        <Stack gap={{base:'30px', md:'40px'}} paddingY={{ base: '30px', md: '50px' }} minHeight={{"2xl":'100vh'}}>
          <SearchForm />
          <SearchResult />
        </Stack>
      </ContentWrapper>
    </MainWrapper>
  )
}

export default page