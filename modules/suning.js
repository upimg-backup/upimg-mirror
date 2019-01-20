const fs = require('fs')
const got = require('got')
const path = require('path')
const check = require('../utils/check')
const FormData = require('form-data')

module.exports = {

  api: 'http://review.suning.com/imageload/uploadImg.do',

  extensions: ['jpg', 'png', 'bmp', 'gif'],

  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'referer': 'http://review.suning.com/my_cmmdty_review.do'
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let form = new FormData()
    form.append('Filedata', fs.createReadStream(pathname))
    form.append('omsOrderItemId', 1)
    form.append('custNum', 1)
    form.append('deviceType', 1)

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(this.api, options)
      .then(response => {
        let body = response.body
        let found = /image.suning.cn\/uimg\/ZR\/share_order\/(\d+)/.exec(body)
        if (found === null) {
          throw new Error(`Upload Error`)
        }
        return {
          url: `https://image.suning.cn/uimg/ZR/share_order/${found[1]}.jpg`,
          type: info.type
        }
      })
  }

}
