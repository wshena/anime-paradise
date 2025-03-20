export interface SkeletonLoaderProps {
  dimension: {
    width: string | number | {base?:string | number, md?:string|number, lg?:string|number, xl?:string|number, "2xl"?:string|number}
    height: string | number | {base?:string | number, md?:string|number, lg?:string|number, xl?:string|number, "2xl"?:string|number}
  }
}

export interface GenreProps {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

export interface JumbotronInfoProps {
  id: number,
  title: string,
  synopsis: string,
  image: string,
  rating: string,
  genre: GenreProps[]

}