import React from 'react'

interface Props {
  text: string
}

export const H1 = ({text}:Props) => {
  return (
    <h1 className="text-[1.5rem] md:text-[2rem] xl:text-[3rem] font-semibold capitalize tracking-tight text-white">{text}</h1>
  )
}

export const H2 = ({text}:Props) => {
  return (
    <h2 className="text-md md:text-lg font-semibold tracking-tight text-white">{text}</h2>
  )
}

export const H3 = ({text}:Props) => {
  return (
    <h3 className="text-md md:text-lg font-semibold tracking-tight text-white">{text}</h3>
  )
}