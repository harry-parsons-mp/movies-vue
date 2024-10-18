import * as yup from 'yup'

export const reviewSchema = yup.object({
  title: yup.string().required(),
  score: yup.number().required(),
  content: yup.string().required()
})

export const movieSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  genre: yup.string(),
  image: yup.mixed()
})

export const userSchema = yup.object({
  username: yup.string().required(),
  password: yup.string()
})
