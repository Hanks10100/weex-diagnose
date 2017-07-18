const fs = require('fs')
const url = require('url')

const dotweRE = /^(https?\:\/\/dotwe\.org)\/(vue|weex)\/(\w+)$/i
function decode (url) {
  // 解析 dotwe 中的链接
  if (url.match(dotweRE)) {
    return url.replace(dotweRE, ($, host, type, hash) => {
      return `${host}/raw/dist/${hash}.bundle.${type === 'weex' ? 'js' : 'wx'}`
    })
  }
  return url
}

function fetch (url, resolve, reject) {
  return download(decode(url.toLowerCase()), resolve, reject)
}

// 下载远程文件
function download(remotePath, onfinish, onerror) {
  // console.log(` => remotePath`, remotePath)

  // 动态选择 http 或 https
  let service = null
  switch (url.parse(remotePath).protocol) {
    case 'http:' : service = require('http');  break;
    case 'https:': service = require('https'); break;
    default: onerror && onerror('wrong url')
  }

  if (service) {
    service.get(remotePath, response => {
      response.setEncoding('utf8')
      let code = ''
      response.on('data', chunk => code += chunk)
      response.on('end', () => (onfinish && onfinish(code)))
    }).on('error', err => {
      onerror && onerror(err.message)
    })
  }
}

module.exports = fetch
