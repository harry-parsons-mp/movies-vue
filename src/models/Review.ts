export interface Review {
  id?: number
  title: string
  score: number
  content: string

  userID: number
  movieID: number
}
