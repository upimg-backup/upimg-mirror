const fs = require('fs')
const got = require('got')
const path = require('path')
const random = require('../utils/random')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'http://picupload.service.weibo.com/interface/pic_upload.php?markpos=0&logo=&nick=0&marks=0&app=miniblog',

  extensions: ['jpg', 'png', 'webp', 'gif', 'tif'],

  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'Cookie': ''
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
    form.append('pic1', fs.createReadStream(pathname))

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(this.api, options)
      .then(response => {
        let body = response.body
        let found = /"pid":"(\w+)"/.exec(body)
        if (found === null) {
          throw new Error(`Upload Error`)
        }
        let r = random(['wx1', 'wx2', 'wx3', 'wx4'])
        return {
          url: `https://${r}.sinaimg.cn/large/${found[1]}`,
          type: info.type
        }
      })
  }

}
