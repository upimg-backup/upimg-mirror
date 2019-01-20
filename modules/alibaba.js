const fs = require('fs')
const got = require('got')
const path = require('path')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'https://kfupload.alibaba.com/mupload',

  extensions: ['jpg', 'png', 'gif'],

  headers: {
    'User-Agent': 'iAliexpress/6.22.1 (iPhone; iOS 12.1.2; Scale/2.00)'
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
    form.append('scene', 'aeMessageCenterV2ImageRule')
    form.append('name', `${path.basename(pathname)}.${info.type.ext}`)

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(this.api, options)
      .then(response => {
        let json = JSON.parse(response.body)
        if (json.code !== '0') {
          throw new Error(`Upload Error`)
        }
        return {
          url: json.url,
          type: info.type
        }
      })
  }

}
