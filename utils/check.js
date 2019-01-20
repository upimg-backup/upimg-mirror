const fs = require('fs')
const readChunk = require('read-chunk')
const fileType = require('file-type')

module.exports = (pathname, extensions, maxsize) => {

  let lstat = fs.lstatSync(pathname)

  if (!lstat.isFile()) {
    throw new Error(`Invalid path`)
  }

  if (lstat.size > maxsize) {
    throw new Error(`Image too large`)
  }

  let buffer = readChunk.sync(pathname, 0, 4100)
  let filetype = fileType(buffer)
  if (filetype === null || !extensions.includes(filetype.ext)) {
    throw new Error(`File is not a valid image`)
  }

  return {
    type: filetype,
    size: lstat.size
  }

}
