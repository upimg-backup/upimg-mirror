const fs = require('fs')
const got = require('got')
const path = require('path')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'https://shopapi.io.mi.com/homemanage/shop/uploadpic',

  extensions: ['jpg', 'png'],

  headers: {
    'User-Agent': 'MJYP/2.6.1 (iPhone; iOS 12.1; Scale/2.00)'
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let form = new FormData()
    form.append('pic', fs.createReadStream(pathname))

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(this.api, options)
      .then(response => {
        let json = JSON.parse(response.body)
        if (json.code !== 0) {
          throw new Error(`Upload Error`)
        }
        return {
          url: json.result,
          type: info.type
        }
      })
  }

}
