'use client'
import React from 'react'
import { persistor, store } from '@/redux/store'
import { Provider as ChakraProvider } from "@/components/ui/provider"
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default AppProvider
