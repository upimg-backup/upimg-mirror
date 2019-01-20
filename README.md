<p align="center">
<a href="https://www.npmjs.com/package/upimg">
<img src="https://user-images.githubusercontent.com/2666735/48976182-3dbbc080-f0bd-11e8-85f8-25533486dce1.png">
</a>
</p>

<p align="center">
<a href="https://i-meto.com"><img alt="Author" src="https://img.shields.io/badge/Author-METO-blue.svg?style=flat-square"/></a>
<a href="https://www.npmjs.com/package/upimg"><img alt="Version" src="https://img.shields.io/npm/v/upimg.svg?style=flat-square"/></a>
<img alt="License" src="https://img.shields.io/npm/l/upimg.svg?style=flat-square"/>
</p>


## Usage

### Installation

```bash
npm install upimg
```
or
```bash
yarn add upimg
```

### Require module

```javascript
const upimg = require('upimg')
```

### Support servers

|server|endpoint|cookie|url|
|:---:|:---:|:---:|---|
|alibaba|aliexpress|-|[ae01.alicdn.com](https://ae01.alicdn.com/kf/HTB1dYeZXZrrK1RjSspa763REXXaP.png)|
|jd|京东|-|[img14.360buyimg.com](https://img14.360buyimg.com/img/jfs/t27652/56/2185046614/6538/3a9cae42/5bfa42ccN6f124f96.png)|
|netease|网易严选|-|[yanxuan.nosdn.127.net](https://yanxuan.nosdn.127.net/3093b774838d230839f4b9dbf93a5e24.png)|
|smms|smms|-|[i.loli.net](https://i.loli.net/2018/11/25/5bfa42f923fe8.png)|
|suning|苏宁易购|-|[image.suning.cn](https://image.suning.cn/uimg/ZR/share_order/154744665504078477.jpg)|
|xiaomi|小米有品|-|[shop.io.mi-img.com](https://shop.io.mi-img.com/app/shop/img?id=shop_601628d09da962bb7ae33344d1529303.png&w=512&h=512)|
|xitu|掘金|-|[user-gold-cdn.xitu.io](https://user-gold-cdn.xitu.io/2018/12/11/1679cff746d2dd30)|
|panda|熊猫直播|require|[i.h2.pdim.gs](https://i.h2.pdim.gs/601628d09da962bb7ae33344d1529303.png)|
|qcloud|云+社区|require|[ask.qcloudimg.com](https://ask.qcloudimg.com/draft/1134330/g2oaa9bdbx.png)|
|weibo|微博|require|[wx1.sinaimg.cn](https://wx1.sinaimg.cn/large/006FQA5Jgy1fxvodtp4w1j30e80e8dfq)|

 > for chinese users: 由于某公司方面施压，upimg 将不维护以上列表外服务的可用性

### Upload file

take `alibaba` for example

```javascript
upimg.alibaba
    .upload('./test/nodejs.png')
    .then(json => console.log(json))
    .catch(err => console.error(err.message))
```

success response
```json
{
    "url": "https://ae01.alicdn.com/kf/HTB1dYeZXZrrK1RjSspa763REXXaP.png",
    "type": {
        "ext": "png",
        "mime": "image/png"
    }
}
```

take `panda` for cookies required example

```javascript
upimg.panda
    .cookie('foo=bar; xxx=123')
    .upload('./test/nodejs.png')
    .then(json => console.log(json))
    .catch(err => console.error(err.message))
```

success response
```json
{
    "url": "https://i.h2.pdim.gs/601628d09da962bb7ae33344d1529303.png",
    "type": {
        "ext": "png",
        "mime": "image/png"
    }
}
```

## Author

**upimg** © [metowolf](https://github.com/metowolf), Released under the [MIT](./LICENSE) License.<br>

> Blog [@meto](https://i-meto.com) · GitHub [@metowolf](https://github.com/metowolf) · Twitter [@metowolf](https://twitter.com/metowolf) · Telegram Channel [@metooooo](https://t.me/metooooo)
