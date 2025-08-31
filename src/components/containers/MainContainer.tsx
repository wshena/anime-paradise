'use client'

import React from 'react'
import { store } from '@/lib/redux/store'
import { Provider as ReduxProvider } from 'react-redux'

const MainContainer = ({children}:DefaultContainerProps) => {
  return (
    <div className="relative">
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </div>
  )
}

export default MainContainer