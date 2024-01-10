export type Media = {
  id: number
  title: {
    romaji: string
    english: string
    native: string
  }
  popularity: number
  coverImage: {
    medium: string
  }
  type: string
  chapters: number
  volumes: number
  bannerImage: string
  favourites: number
}

export type PageInfo = {
  currentPage: number
  hasNextPage: boolean
  lastPage: number
  perPage: number
  total: number
}

export type Page = {
  media: Array<Media>
  pageInfo: PageInfo
}
