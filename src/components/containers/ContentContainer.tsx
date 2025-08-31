import React from 'react'

const ContentContainer = ({children}:Default_Container) => {
  return (
    <div className="w-[1440px] mx-auto px-">
      {children}
    </div>
  )
}

export default ContentContainer