import React from 'react'

const ContentContainer = ({children}:Default_Container) => {
  return (
    <div className="max-w-[1440px] mx-auto px-10 xl:px-20 border border-red-600">
      {children}
    </div>
  )
}

export default ContentContainer