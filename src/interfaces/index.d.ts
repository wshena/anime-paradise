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

interface BigBannerInfoProps {
  id: number,
  title: string,
  synopsis: string,
  image: string,
  rating: string,
  genre: GenreProps[]
}

interface GenreProps {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

interface ThemesProps {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

interface Producers {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

interface Studios {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

interface TitlesProps {
  type: string,
  title: string
}