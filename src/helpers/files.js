import fs from 'fs'
import parse from 'csv-parse'

export const readText = async (srcPath) => {
  return new Promise((resolve) => {
    const list = []

    fs.createReadStream(srcPath)
      .pipe(parse({ delimiter: '\n' }))
      .on('data', (row) => {
        list.push(...row)
      })
      .on('end', () => {
        resolve(list)
      })
  })
}

export const readCsv = async (srcPath) => {
  return new Promise((resolve) => {
    const list = []

    fs.createReadStream(srcPath)
      .pipe(parse({ delimiter: ',' }))
      .on('data', (row) => {
        const [id, name, username] = row
        list.push({ id, name, username })
      })
      .on('end', () => {
        resolve(list)
      })
  })
}
