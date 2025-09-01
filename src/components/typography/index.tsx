import React from 'react'

interface Props {
  text: string
}

export const H1 = ({text}:Props) => {
  return (
    <h1 className="text-lg md:text-xl font-semibold capitalize tracking-tight text-white">{text}</h1>
  )
}

export const H2 = ({text}:Props) => {
  return (
    <h2 className="text-md md:text-lg font-semibold tracking-tight text-white">{text}</h2>
  )
}

export const H3 = ({text}:Props) => {
  return (
    <h2 className="text-md md:text-lg font-semibold tracking-tight text-white">{text}</h2>
  )
}