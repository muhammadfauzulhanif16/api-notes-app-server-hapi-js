const AWS = require('aws-sdk')

exports.StorageServices = () => {
  const writeFile = (file, meta) => {
    return new Promise((resolve, reject) => {
      new AWS.S3().upload(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: +new Date() + meta.filename,
          Body: file._data,
          ContentType: meta.headers['content-type']
        },
        (error, data) => {
          if (error) return reject(error)

          return resolve(data.Location)
        }
      )
    })
  }

  return {
    writeFile
  }
}
