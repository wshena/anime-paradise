'use client'

import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { LuSettings2 } from "react-icons/lu";
import { MdOutlineFilterList } from "react-icons/md";
import { popularFilter, popularType } from '@/utils/const';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { setPopularFilter } from '@/redux/slice/filterSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FilterButton = ({icon, data, type, bottom}:{icon:React.ReactNode, data:any, type:string, bottom:string|number}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  
  const {popularFilter} = useAppSelector((state:RootState) => state.filter);
  
  // Ambil nilai awal dari redux atau gunakan default
  const initialValue = {
    label: type === 'filter' 
      ? data.find((item:any) => item.value === popularFilter.filter)?.label || data[0].label
      : data.find((item:any) => item.value === popularFilter.type)?.label || data[0].label,
    value: type === 'filter'
      ? popularFilter.filter || data[0].value
      : popularFilter.type || data[0].value
  };
  
  const [value, setValue] = useState<{label:string, value:string}>(initialValue);
  const [isClick, setIsClick] = useState<boolean>(false);

  // Hanya dispatch ketika value berubah
  const handleValueChange = (newValue: {label: string, value: string}) => {
    setValue(newValue);
    setIsClick(false);
    
    // Update Redux state
    if (type === 'filter') {
      dispatch(setPopularFilter({
        filter: newValue.value,
        type: popularFilter.type // Preserve existing type
      }));
    } else {
      dispatch(setPopularFilter({
        type: newValue.value,
        filter: popularFilter.filter // Preserve existing filter
      }));
    }
    
    // Dapatkan nilai page dari URL saat ini atau gunakan default '1'
    const currentPage = searchParams.get('page') || '1';
    
    // Buat parameter URL baru
    const newParams = new URLSearchParams();
    newParams.set('page', currentPage);
    
    // Tambahkan filter dan type jika ada
    if (type === 'filter') {
      if (newValue.value) newParams.set('filter', newValue.value);
      if (popularFilter.type) newParams.set('type', popularFilter.type);
    } else {
      if (popularFilter.filter) newParams.set('filter', popularFilter.filter);
      if (newValue.value) newParams.set('type', newValue.value);
    }
    
    // Redirect ke URL baru
    router.push(`/anime/popular?${newParams.toString()}`);
  };

  return (
    <button onClick={() => {
      setIsClick(!isClick);
    }} className='relative'>
      <HStack minWidth={'140px'} alignItems={'center'} gap={{base:'10px', md:'15px'}} padding={{base:'.9rem', md:'1rem'}} cursor={'pointer'} bgColor={'gray.700'} _hover={{bgColor:'gray.800'}}>
        {icon}
        <Text fontSize={{base:'.9rem', md:'1rem'}}>{value?.label}</Text>
      </HStack>
      {isClick && (
        <Box position={'absolute'} bottom={bottom} right={'0px'} zIndex={30}>
          <Stack alignItems={'start'} gap={'0px'}>
            {data?.map((item:any) => (
              <Box key={item?.label} onClick={(e:any) => {
                e.stopPropagation();
                handleValueChange({label:item?.label, value:item?.value});
              }} padding={{base:'.9rem', md:'1rem'}} cursor={'pointer'} bgColor={'gray.700'} _hover={{bgColor:'gray.800'}} minWidth={'150px'}>
                <Text textAlign={'left'} fontSize={{base:'.9rem', md:'1rem'}}>{item?.label}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </button>
  );
};

const PopularFilter = ({label}:{label:string}) => {
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} flexDir={{base:'column', md:'row'}} gap={{base:'15px', md:'0px'}}>
      <Heading as={'h1'} fontSize={{base:'1rem', md:'1.3rem', lg:'1.5rem'}}>{label}</Heading>
      <Flex alignItems={'center'} gap={{base:'15px', md:'20px'}}>
        <FilterButton icon={<MdOutlineFilterList size={20} color='white' />} data={popularFilter} type='filter' bottom={'-220px'} />
        <FilterButton icon={<LuSettings2 size={20} color='white' />} data={popularType} type='type' bottom={'-500px'} />
      </Flex>
    </Flex>
  )
}

export default PopularFilter