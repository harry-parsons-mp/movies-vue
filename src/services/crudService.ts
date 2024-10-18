import axios from 'axios'

const api = import.meta.env.VITE_API_URL

export const List = async (model: string): object => {
  const response = await axios.get(`${api}/${model}`)
  return await response.data
}

export const Get = async (model: string, id: number): object => {
  const response = await axios.get(`${api}/${model}/${id}`)
  return await response.data
}

export const Create = async (model: string, obj: object): object => {
  const response = await axios.post(`${api}/${model}`, obj)
  return await response.data
}

export const Update = async (model: string, obj: object): object => {
  const response = await axios.put(`${api}/${model}/${obj.id}`, obj)
  return await response.data
}

export const Delete = async (model: string, id: number): object => {
  const response = await axios.delete(`${api}/${model}/${id}`)
  return await response.data
}
