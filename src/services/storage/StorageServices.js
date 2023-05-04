const fs = require('fs')

exports.StorageServices = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }

  const writeFile = (file, meta) => {
    const filename = +new Date() + meta.filename
    const path = `${folder}/${filename}`
    const fileStream = fs.createWriteStream(path)

    return new Promise((resolve, reject) => {
      fileStream.on('error', (err) => reject(err))
      file.pipe(fileStream)
      file.on('end', () => resolve(filename))
    })
  }

  return {
    writeFile
  }
}
