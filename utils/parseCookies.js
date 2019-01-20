module.exports = (cookies) => {
  let list = {}
  if (cookies) {
    cookies.split(';').forEach(cookie => {
      let parts = cookie.split('=')
      list[parts.shift().trim()] = decodeURI(parts.join('='))
    })
  }
  return list
}
