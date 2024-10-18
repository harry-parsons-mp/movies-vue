import { Create } from '@/services/crudService'

export const UploadImage = async (movieID: number, image: object) => {
  const imageReq = new FormData()
  imageReq.append('movieID', movieID)
  imageReq.append('image', image)
  try {
    await Create('image', imageReq)
  } catch (e) {
    console.log(e)
  }
}
