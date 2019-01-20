const fs = require('fs')
const got = require('got')
const path = require('path')
const random = require('../utils/random')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'https://search.jd.com/image?op=upload',

  extensions: ['jpg', 'png', 'bmp'],

  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'referer': 'https://www.jd.com'
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

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(this.api, options)
      .then(response => {
        let body = response.body
        let found = /callback\("(jfs.*)"\);/.exec(body)
        if (found === null) {
          throw new Error(`Upload Error`)
        }
        let r = random([1, 10, 11, 12, 13, 14, 20, 30])
        return {
          url: `https://img${r}.360buyimg.com/img/${found[1]}`,
          type: info.type
        }
      })
  }

}
