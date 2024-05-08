import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3({ params: { Bucket: 'gogo-stelvis' } })

export const s3ImageUpload = (params: any) => {
  return new Promise((resolve, reject) => {
    const { filename, file } = params

    const buf = Buffer.from(file.replace(/^data:.+;base64,/, ''), 'base64')

    const currentTime = new Date().getTime()

    const data = {
      Key: `${currentTime}_${filename}`,
      Body: buf,
      ContentEncoding: 'base64',
      ACL: 'public-read',
      Bucket: 'gogo-stelvis',
    }

    s3.putObject(data, (err, data) => {
      if (err) {
        console.log(`Error uploading file: ${err}`)
        reject(err)
      } else {
        const url = `https://gogo-stelvis.s3.amazonaws.com/${currentTime}_${filename}`
        console.log(`File uploaded successfully. File URL: ${url}`)
        resolve({ url })
      }
    })
  })
}
