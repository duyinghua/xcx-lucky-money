import wepy from 'wepy'

export default class Uploader {
  static async uploadImage(url, filePath) {
    const params = {
      url: url,
      filePath: filePath,
      name: 'img',
      header: {
        origin: 'h5.weidian.com'
      },
      formData: {
        uploadId: Date.parse(new Date()),
        file: filePath
      }
    }
    const res = await wepy.uploadFile(params)
    console.log('image upload result is--------------------------------')
    console.log(res)
    console.log('--------------------------------end')
    if (typeof res.data === 'string') {
      return JSON.parse(res.data)
    } else {
      return res.data
    }
  }
}
