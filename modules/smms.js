const fs = require('fs')
const got = require('got')
const path = require('path')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'https://sm.ms/api/upload',

  extensions: ['jpg', 'png', 'gif', 'bmp'],

  headers: {
    'User-Agent': `Upimg/got`
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let form = new FormData()
    form.append('smfile', fs.createReadStream(pathname))
    form.append('ssl', 1)
    form.append('format', 'json')

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(this.api, options)
      .then(response => {
        let json = JSON.parse(response.body)
        if (json.code !== 'success') {
          throw new Error(`${json.code}: ${json.msg}`)
        }
        return {
          url: json.data.url,
          type: info.type
        }
      })
  }

}
