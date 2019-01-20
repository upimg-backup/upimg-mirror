const fs = require('fs')
const path = require('path')
const got = require('got')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'http://you.163.com/xhr/file/upload.json',

  extensions: ['jpg', 'png', 'gif'],

  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'referer': 'http://you.163.com/'
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let form = new FormData()
    form.append('file', fs.createReadStream(pathname))
    form.append('format', 'json')

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(this.api, options)
      .then(response => {
        let json = JSON.parse(response.body)
        if (json.code !== '200') {
          throw new Error(`${json.code}: ${json.errorCode}`)
        }
        return {
          url: json.data[0].replace('http://', 'https://'),
          type: info.type
        }
      })
  }

}
