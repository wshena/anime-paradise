'use client'

import React from 'react'
import { store } from '@/lib/redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import ProgressBar from '../ProgressBar'

const MainContainer = ({children}:DefaultContainerProps) => {
  return (
    <div className="relative">
      <ReduxProvider store={store}>
        <ProgressBar />
        {children}
      </ReduxProvider>
    </div>
  )
}

export default MainContainer