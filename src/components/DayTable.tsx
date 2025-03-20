'use client'
import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { Days } from '@/utils/const'
import { usePathname } from 'next/navigation'

const DayTable = () => {
  const pathname = usePathname();
  const day = pathname.split("/")[2];

  return (
    <Box width={'100%'} overflowX={'auto'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        {Days.map((item:string) => (
          <Link key={item} href={`/schedule/${item}`}>
            <Text minWidth={'130px'} paddingBottom={'10px'} borderBottom={'1px solid black'} _hover={{borderBottom:'1px solid rgb(255, 100, 10)', color:'rgb(255, 100, 10)'}} textTransform={'capitalize'} textAlign={'center'} color={day === item ? 'rgb(255, 100, 10)' : 'white'}>{item}</Text>
          </Link>
        ))}
      </Flex>
    </Box>
  )
}

export default DayTable