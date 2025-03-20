'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { Heading, Box, Field, Input, defineStyle, Text, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/store'
import { setAlert } from '@/redux/slice/alert'

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "",
  px: "0.5",
  top: "-3",
  color: 'white',
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "white",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "white",
    top: "-3",
    insetStart: "2",
  },
})

const Page = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPass = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPass(!showPass);
  }

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')
    setIsLoading(true)

    // Validasi format email menggunakan regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMsg('Format email tidak valid.')
      setIsLoading(false)
      return
    }

    // Validasi password (misal minimal 6 karakter)
    if (password.length < 6) {
      setErrorMsg('Password minimal harus 6 karakter.')
      setIsLoading(false)
      return
    }

    // Proses login dengan Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      dispatch(setAlert({
        label:error.message || 'Sign in gagal, silakan coba lagi.',
        type:'error',
      }))
    } else if (data) {
      router.push('/auth/login')
    }
    setIsLoading(false)
  };

  useEffect(() => {
    if (!errorMsg) return;
  
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [errorMsg]);

  return (
    <>
      <Heading as={'h1'} fontSize={{ base: '1.3rem', md: '1.5rem', lg: '2rem' }}>
        Create Account
      </Heading>
      <form onSubmit={handleSignin} className='w-full flex flex-col gap-[20px]'>
        {/* error message */}
        {errorMsg !== '' && (
          <Box bg="red.500" padding="0.5rem" borderRadius="md">
            <Text color="white">{errorMsg}</Text>
          </Box>
        )}
        {/* Email */}
        <Field.Root fontSize={'1rem'}>
          <Box pos="relative" w="full" borderBottom={'1px solid rgb(255, 100, 10)'}>
            <Input
              required
              type='email'
              name='email'
              id='email'
              className="peer"
              placeholder=""
              value={email}
              borderRadius={'0px'}
              border={'none'}
              _focus={{outline:'none'}}
              paddingLeft={'10px'}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field.Label css={floatingStyles}>Email Address</Field.Label>
          </Box>
        </Field.Root>
        {/* Password */}
        <Field.Root fontSize={'1rem'}>
          <Flex alignItems={'center'} gap={'10px'} w={'100%'}>
            <Box pos="relative" width={'100%'} borderBottom={'1px solid rgb(255, 100, 10)'}>
              <Input
                required
                type={showPass ? 'text' : 'password'}
                name='password'
                id='password'
                className="peer w-full"
                placeholder=""
                value={password}
                border={'none'}
                _focus={{outline:'none'}}
                paddingLeft={'10px'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Field.Label css={floatingStyles}>Password</Field.Label>
            </Box>
            <button onClick={handleShowPass}>
              <Text cursor={'pointer'} textTransform={'uppercase'} fontSize={'.7rem'} color={'gray.500'} _hover={{ color: 'white' }}>
                {showPass ? 'HIDDEN' : 'SHOW'}
              </Text>
            </button>
          </Flex>
        </Field.Root>

        <button type='submit'>
          <Box
            width={'100%'}
            cursor={'pointer'}
            paddingX={'1rem'}
            paddingY={'.5rem'}
            borderRadius={'10px'}
            bgColor={'rgb(255, 100, 10)'}
            color={'black'}
          >
            {isLoading ? 
              <Spinner size="sm" color="black" /> : 
              <Text textTransform={'uppercase'} fontWeight={'bold'}>Create Account</Text>}
          </Box>
        </button>
      </form>
      <Flex alignItems={'center'} justifyContent={'center'} gap={'10px'} width={'100%'}>
        <Text>Already have an acount?</Text>
        <Link href={'/auth/login'}>
          <Text textTransform={'uppercase'} color={'rgb(255, 100, 10)'} _hover={{ color: 'white' }}>
            Log In
          </Text>
        </Link>
      </Flex>
    </>
  )
}

export default Page
