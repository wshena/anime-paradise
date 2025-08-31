import React from 'react'

interface Props {
  icon: React.ReactNode
  classname: string,
  onclick?: any
}

export const ButtonIcon = ({icon, classname, onclick}:Props) => {
  return (
    <button onClick={onclick} aria-label='Icon Button' className={classname}>
      {icon}
    </button>
  )
}

export default ButtonIcon