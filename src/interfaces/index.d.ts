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

interface GenreProps {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

interface BigBannerInfoProps {
  id: number,
  title: string,
  synopsis: string,
  image: string,
  rating: string,
  genre: GenreProps[]
}