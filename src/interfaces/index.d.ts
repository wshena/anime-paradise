interface DefaultContainerProps {
  children: React.ReactNode
}

interface IconProps {
  size: number,
  classname: string
}

interface LinkProps {
  label: string,
  link: string
}

interface FooterNavigationProps {
  label:string,
  links: LinkProps[]
}