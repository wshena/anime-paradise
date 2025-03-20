'use client'
import supabase from '@/lib/supabaseClient'
import { logoutUser } from '@/redux/slice/auth'
import { useAppDispatch } from '@/redux/store'
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'

function useLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    // Hindari multiple klik selama proses logout berjalan
    if (isLoggingOut) return;
    
    console.log('Memulai proses logout...');
    setIsLoggingOut(true);
    setError(null);
    
    try {
      // Beri waktu untuk pastikan request dikirim dengan menambahkan timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout saat logout')), 10000)
      );
      
      // Race antara proses normal dan timeout
      const { error: signOutError } = await Promise.race([
        supabase.auth.signOut(),
        timeoutPromise
      ]) as any;
      
      if (signOutError) {
        console.error('Terjadi error saat signOut:', signOutError.message);
        setError(signOutError.message);
        setIsLoggingOut(false);
        return;
      }
      
      // Dispatch action untuk update state Redux
      dispatch(logoutUser());
      console.log('State logout berhasil didispatch');
      
      // Tambahkan jeda kecil sebelum redirect untuk memastikan state terupdate
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Redirect ke halaman login
      console.log('Mengalihkan ke halaman login');
      router.push('/auth/login');
      
      // Reset state jika diperlukan (meskipun akan unmount)
      setIsLoggingOut(false);
      
    } catch (err: any) {
      console.error('Error selama logout:', err);
      setError(err.message || 'Terjadi kesalahan saat logout');
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut, error };
}

const LogoutButton = () => {
  const { logout, isLoggingOut, error } = useLogout();

  return (
    <button onClick={logout} disabled={isLoggingOut} className='w-full'>
      <Box width={'100%'} cursor={'pointer'} _hover={{backgroundColor:'gray.700'}} padding={'1rem'}>
        {isLoggingOut ? (
          <>
            <Spinner size="sm" color="black" />
          </>
        ) : (
          <>
            <Flex alignItems={'center'} gap={'10px'}>
              <IoIosLogOut size={30} color='white' />
              <Text fontSize={'1rem'} color={'white'} textTransform={'capitalize'}>Log out</Text>
            </Flex>
          </>
        )}
      </Box>
    </button>
  )
}

export default LogoutButton