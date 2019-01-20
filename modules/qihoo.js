const fs = require('fs')
const got = require('got')
const path = require('path')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'http://st.so.com/stu',

  extensions: ['jpg', 'png', 'webp', 'gif', 'bmp'],

  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'referer': 'http://image.so.com'
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let form = new FormData()
    form.append('upload', fs.createReadStream(pathname))

    let options = {
      body: form,
      headers: this.headers,
      followRedirect: false
    }

    return got.post(this.api, options)
      .then(response => {
        if (response.statusCode !== 302) {
          throw new Error(`${response.statusCode}: ${response.statusMessage}`)
        }
        let location = response.headers.location
        let found = /imgkey=(\w*)\.jpg/.exec(location)
        if (found === null || found[1].length === 0) {
          throw new Error(`Upload Error`)
        }
        return {
          url: `https://ps.ssl.qhmsg.com/${found[1]}.${info.type.ext}`,
          type: info.type
        }
      })
  }

}
