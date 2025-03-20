import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import ContentWrapper from './wrapper/ContentWrapper'
import { FooterNavigation } from '@/utils/const'

const HeadingLink = ({label, linkName, url}:{label:string, linkName:string, url:string}) => {
  return (
    <Heading as={'h3'} fontWeight={'light'} fontSize={{base:'.9rem', md:'1.2rem'}}>
        {label}
      <Link href={url}>
        <Heading as={'span'} _hover={{cursor:'pointer'}} fontSize={{base:'.9rem', md:'1.2rem'}}>{linkName}</Heading>
      </Link>
    </Heading>
  )
}

const DescriptionBox = () => {
  return (
    <Box width={{base:'100%', lg:'400px', xl:'500px'}} padding={{base:'1rem', md:'1.3rem'}} backgroundColor={'gray.700'}>
      <Stack alignItems={'start'} width={'100%'} gap={'15px'}>
        <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem'}}>Anime Paradise</Heading>
        <Text fontSize={{base:'.9rem', md:'.9rem'}}>Anime Paradise is your ultimate anime streaming destination, offering a vast collection of shows and movies at your fingertips. Watch the latest episodes, explore trending series, and enjoy high-quality streaming anytime, anywhere.</Text>
      </Stack>
    </Box>
  )
}

const Navigation = ({data}:{data:any}) => {
  return (
    <Stack gap={{base:'10px', md:'15px'}}>
      <Heading as={'span'} fontWeight={'bold'}>{data?.label}</Heading>
      {data?.links?.map((item:any) => (
        <Link href={item?.link} key={item?.label}>
          <Heading as={'span'} _hover={{borderBottom:'1px solid white'}} fontWeight={'light'} fontSize={'1rem'}>{item?.label}</Heading>
        </Link>
      ))}
    </Stack>
  )
}

const Footer = () => {
  return (
    <footer>
      <Box width={'100%'} backgroundColor={'gray.800'}>
        <ContentWrapper>
          <Stack alignItems={'start'} width={'100%'} paddingY={{base:'30px', md:'30px'}} gap={'20px'}>
            <Stack width={'100%'} alignItems={'start'} direction={{base:'column', lg:'row'}} justifyContent={'space-between'} gap={'20px'}>
              <DescriptionBox />
              <Flex width={{base:'100%', md:'90%', lg:'70%'}} alignItems={'start'} justifyContent={'space-between'} flexWrap={'wrap'} gap={{base:'20px', md:'0px'}}>
                {FooterNavigation?.map((item:any) => (
                  <Navigation key={item?.label} data={item} />
                ))}
              </Flex>
            </Stack>
            <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'} paddingTop={{base:'15px', md:'20px'}} borderTop={'1px solid gray'}>
              <HeadingLink label='2025 - ' url='/' linkName='Anime Paradise' />
              <HeadingLink label='Powered by ' url='https://jikan.moe/' linkName='Jikan API' />
            </Flex>
          </Stack>
        </ContentWrapper>
      </Box>
    </footer>
  )
}

export default Footer