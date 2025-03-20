'use client'
import { setSearchParam } from '@/redux/slice/utilitySlice'
import { useAppDispatch } from '@/redux/store'
import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>('');
  
  useEffect(() => {
    dispatch(setSearchParam(input));
  }, [input]);

  const handleRemoveInput = () => setInput('')  ;

  return (
    <form action="">
      <Flex  alignItems={'center'} justifyContent={'space-between'} width={'100%'} paddingBottom={'10px'} borderBottom={'1px solid rgb(255, 100, 10)'} fontSize={{base:'1rem', md:'1.3rem', lg:'1.5rem'}}>
        <input type="text" name="search" id="search" placeholder='Search Title...' className='focus:outline-none text-white w-full bg-none' onChange={(e:any) => setInput(e.target.value) } value={input} autoComplete='off' aria-label='search' />
        {input !== '' && (
          <button type='button' onClick={handleRemoveInput} className='cursor-pointer'>
            <IoClose size={30} color='rgb(255, 100, 10)' />
          </button>
        )}
      </Flex>
    </form>
  )
}

export default SearchForm