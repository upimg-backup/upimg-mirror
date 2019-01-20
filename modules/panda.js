const fs = require('fs')
const path = require('path')
const got = require('got')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'https://www.panda.tv/ajax_upload_img',

  extensions: ['jpg', 'png', 'gif'],

  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'Cookie': '',
    'referer': 'https://www.panda.tv/personal'
  },

  maxsize: 5 * 1024 * 1024,

  cookie(data) {
    this.headers.Cookie = data
    return this
  },

  async upload(pathname) {

    if (!this.headers.Cookie) {
      throw new Error(`Cookie error: empty`)
    }

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let form = new FormData()
    form.append('file', fs.createReadStream(pathname))

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(this.api, options)
      .then(response => {
        let json = JSON.parse(response.body)
        if (json.errno !== 0) {
          throw new Error(`${json.errno}: ${json.errmsg}`)
        }
        let found = /i\d+\.pdim\.gs\/([\w\.]+)/.exec(json.data)
        if (found === null) {
          throw new Error(`Upload Error`)
        }
        return {
          url: `https://i.h2.pdim.gs/${found[1]}`,
          type: info.type
        }
      })
  }

}
