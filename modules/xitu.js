const fs = require('fs')
const got = require('got')
const path = require('path')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'https://cdn-ms.juejin.im/v1/upload?bucket=gold-user-assets',

  extensions: ['jpg', 'png', 'gif', 'webp', 'tif', 'bmp'],

  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
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
        if (json.m !== 'ok') {
          throw new Error(`${json.code}: ${json.msg}`)
        }
        return {
          url: `https://${json.d.domain}/${json.d.key}`,
          type: info.type
        }
      })
  }

}
