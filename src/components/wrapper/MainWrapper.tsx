'use client'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import ModalWrapper from './ModalWrapper';
import SynopsisModal from '../Modal/SynopsisModal';
import ReviewModal from '../Modal/ReviewModal';
import AnimePictureModal from '../Modal/AnimePictureModal';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ProfileMenu from '../offScreenMenu/ProfileMenu';
import { setSession, setUser } from '@/redux/slice/auth';
import supabase from '@/lib/supabaseClient';
import { initUserHistory } from '@/redux/slice/history';
import { initUserWatchlist } from '@/redux/slice/watchlist';
import CustomAlert from '../CustomAlert';
import { setAlert } from '@/redux/slice/alert';
import MobileNav from '../offScreen/MobileNav';

function preventDefault(e: any) {
  e.preventDefault();
}

function disableScroll() {
  window.addEventListener('wheel', preventDefault, { passive: false });
  window.addEventListener('touchmove', preventDefault, { passive: false });
  // Jika diperlukan, tambahkan event listener untuk keydown
  // window.addEventListener('keydown', preventDefaultForScroll, false);
}

function enableScroll() {
  window.removeEventListener('wheel', preventDefault);
  window.removeEventListener('touchmove', preventDefault);
  // window.removeEventListener('keydown', preventDefaultForScroll, false);
}

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const {alert} = useAppSelector((state:RootState) => state.alert);
  const {user, session} = useAppSelector((state:RootState) => state.auth);
  const { showMoreSynopsis, showReview, showAnimePictures, profileButtonClick, mobileNavClick } = useAppSelector((state: RootState) => state.utility);

  // Separate manual check for localStorage session
  const checkLocalStorageSession = () => {
    try {
      // Cek localStorage secara manual
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.includes('supabase.auth.token')) {
          console.log('Found Supabase auth token in localStorage with key:', key)
          return true
        }
      }
      return false
    } catch (e) {
      console.error('Error checking localStorage:', e)
      return false
    }
  }

  useEffect(() => {
    if (showMoreSynopsis.display) {
      disableScroll();
    } else {
      enableScroll();
    }

    // Cleanup saat komponen dibongkar atau ketika showMoreSynopsis berubah
    return () => {
      enableScroll();
    }
  }, [showMoreSynopsis]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const hasLocalStorageSession = checkLocalStorageSession()
        // ========== APPROACH 1: Try standard Supabase getSession ==========
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Standard getSession error:', sessionError)
        } else {
          if (sessionData.session) {
            console.log('Session user ID:', sessionData.session.user.id)
            console.log('Session expires at:', new Date(sessionData.session.expires_at! * 1000))
            
            // If we have a valid session, fetch user data
            if (sessionData.session.user.id) {
              try {
                console.log('Fetching user data...')
                const userData = sessionData.session.user
                
                if (userData) {
                  dispatch(setUser(userData))
                  dispatch(setSession(sessionData.session))
                  return // End execution if successful
                } else {
                  console.warn('No user data found for ID:', sessionData.session.user.id)
                }
              } catch (userError) {
                console.error('Error fetching user data:', userError)
              }
            }
          }
        }
        
        if (hasLocalStorageSession) {
          console.log('STEP 3: Attempting alternative strategy for localStorage session...')
          // This is a fallback approach - we'll manually try to retrieve and use the session
          
          // Set up a one-time auth state listener
          const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, callbackSession) => {
              console.log('Auth state listener triggered:', event)
              
              if (callbackSession) {
                console.log('Session received from auth state change')
                
                try {
                  dispatch(setUser(callbackSession.user))
                  dispatch(setSession(callbackSession))            
                } catch (userError) {
                  console.error('Error fetching user data from auth state change:', userError)
                }
              }
            }
          );
          
          // Force a session check event
          setTimeout(() => {            
            // Clean up the listener after some time
            setTimeout(() => {
              if (authListener && authListener.subscription) {
                authListener.subscription.unsubscribe()
              }
            }, 5000)
          }, 1000)
          
          return
        }
        
        // If we get here, all approaches failed
        console.log('All authentication approaches failed')
        dispatch(setSession(null))
        
      } catch (e) {
        console.error('Unhandled exception in auth initialization:', e)
      }
    }
    
    initAuth()
  }, [dispatch]);

  // init user history
  useEffect(() => {
    if (user) {
      initUserHistory(user?.id);
      initUserWatchlist(user?.id);
    }
  }, [user]);

  useEffect(() => {
    if (alert.label === '') return;
    
    const timer = setTimeout(() => {
      dispatch(setAlert({
        label: '',
        message: '',
        type: 'info'
      }))
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [alert]);

  console.log(user);
  console.log(session);

  const checkOffScreen = () => {
    if (profileButtonClick || mobileNavClick) {
      return true
    }

    return false
  }

  return (
    <Box position={'relative'} paddingTop={'60px'}  width={'100%'} height={checkOffScreen() ? '100vh' : undefined} overflowY={checkOffScreen() ? 'hidden' : 'auto'}>
      <Navbar />
      <main suppressHydrationWarning>{children}</main>
      <Footer />

      {alert.label !== '' && (
        <CustomAlert status={alert.type} title={alert.label} />
      )}

      {mobileNavClick && (
        <MobileNav />
      )}

      {profileButtonClick && (
        <ProfileMenu />
      )}

      {(showMoreSynopsis.display && showMoreSynopsis.data !== '') && (
        <ModalWrapper>
          <SynopsisModal synopsis={showMoreSynopsis.data} />
        </ModalWrapper>
      )}

      {(showReview.display && showReview.data !== null) && (
        <ModalWrapper>
          <ReviewModal data={showReview.data} />
        </ModalWrapper>
      )}

      {(showAnimePictures.display && showAnimePictures.data !== null) && (
        <ModalWrapper>
          <AnimePictureModal data={showAnimePictures.data} />
        </ModalWrapper>
      )}
    </Box>
  )
}

export default MainWrapper;
