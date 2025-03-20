import { Heading, Text } from "@chakra-ui/react"

export const SectionTitle = ({label}:{label:string}) => {
  return (
    <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={{base:'1rem', md:'2rem', lg:'2rem'}} fontStyle={'italic'}>{label}</Heading>
  )
}

export const H1 = ({label}:{label:string}) => {
  return (
    <Heading as={'h1'} fontSize={{base:'1.3rem', md:'1.5rem', lg:'2rem'}}>{label}</Heading>
  )
}

export const H2 = ({label}:{label:string}) => {
  return (
    <Heading as={'h2'} fontSize={{base:'1rem', md:'1.2rem', lg:'1.7rem'}}>{label}</Heading>
  )
}

export const Paragraph = ({text}:{text:string}) =>  {
  return (
    <Text fontSize={{base:'.9rem', md:'.9rem'}} color={'gray.300'}>{text}</Text>
  )
}