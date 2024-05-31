import {
  PutObjectAclCommandOutput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { InternalError } from '../../errors/internal-error'

const s3Client = new S3Client({
  region: 'us-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// const params = {
//   Bucket: 'gogo-stelvis',
// }
export const s3ImageUpload = async (params: any) => {
  return new Promise<string>((resolve, reject) => {
    const { filename, file } = params
    const buf = Buffer.from(file.replace(/^data:.+;base64,/, ''), 'base64')
    const currentTime = new Date().getTime()

    const url = `https://gogo-stelvis.s3.amazonaws.com/${currentTime}_${filename}`

    const data = {
      // ACL: 'bucket-owner-read',
      Key: `${currentTime}_${filename}`,
      Body: buf,
      ContentEncoding: 'base64',
      Bucket: 'gogo-stelvis',
    }

    const command = new PutObjectCommand(data)

    s3Client.send(command, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}

// * aws-sdk v2:
// export const s3ImageUpload = (params: any) => {
//   return new Promise((resolve, reject) => {
//     const { filename, file } = params

//     const buf = Buffer.from(file.replace(/^data:.+;base64,/, ''), 'base64')

//     const currentTime = new Date().getTime()

//     const data = {
//       Key: `${currentTime}_${filename}`,
//       Body: buf,
//       ContentEncoding: 'base64',
//       ACL: 'public-read',
//       Bucket: 'gogo-stelvis',
//     }

//     s3.putObject(data, (err, data) => {
//       if (err) {
//         console.log(`Error uploading file: ${err}`)
//         reject(err)
//       } else {
//         const url = `https://gogo-stelvis.s3.amazonaws.com/${currentTime}_${filename}`
//         console.log(`File uploaded successfully. File URL: ${url}`)
//         resolve({ url })
//       }
//     })
//   })
// }
