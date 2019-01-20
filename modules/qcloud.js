const fs = require('fs')
const got = require('got')
const path = require('path')
const check = require('../utils/check')
const parseCookies = require('../utils/parseCookies')
const FormData = require('form-data')

module.exports = {

  api: 'https://cloud.tencent.com/developer/services/ajax/image?action=UploadImage&uin={uin}&csrfCode={csrfCode}',

  extensions: ['jpg', 'png', 'gif'],

  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'Cookie': '',
    'referer': 'https://cloud.tencent.com/developer/article/write'
  },

  maxsize: 5 * 1024 * 1024,

  cookie(data) {
    this.headers.Cookie = data
    return this
  },

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let cookies = parseCookies(this.headers.Cookie)

    let uin = cookies.uin
    if (uin === undefined) {
      throw new Error(`Cookie error: uin undefined`)
    }
    uin = uin.replace(/^o0*/, '')

    let skey = cookies.skey || cookies.p_skey
    if (skey === undefined) {
      throw new Error(`Cookie error: skey undefined`)
    }

    // time33
    let csrfCode = 5381
    for (let i = 0; i < skey.length; i += 1) {
      csrfCode += (csrfCode << 5) + skey.charCodeAt(i)
    }
    csrfCode &= 2147483647

    let api = this.api
      .replace('{uin}', uin)
      .replace('{csrfCode}', csrfCode)

    let form = new FormData()
    form.append('image', fs.createReadStream(pathname))
    form.append('filename', `${path.basename(pathname)}.${info.type.ext}`)

    let options = {
      body: form,
      headers: this.headers
    }

    return got.post(api, options)
      .then(response => {
        let json = JSON.parse(response.body)
        if (json.code !== 0) {
          throw new Error(`${json.code}: ${json.msg}`)
        }
        return {
          url: json.data.url,
          type: info.type
        }
      })
  }

}
