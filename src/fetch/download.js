const url = require('url')
const { convertURL } = require('../utils')

// 下载远程文件
function download (remotePath, onfinish, onerror) {
  const realUrl = convertURL(remotePath.toLowerCase())
  // console.log(` => download ${realUrl}`)

  // 动态选择 http 或 https
  let service = null
  switch (url.parse(realUrl).protocol) {
    case 'http:' : service = require('http');  break;
    case 'https:': service = require('https'); break;
    default: onerror && onerror('wrong url')
  }

  if (service) {
    service.get(realUrl, response => {
      response.setEncoding('utf8')
      let code = ''
      response.on('data', chunk => code += chunk)
      response.on('end', () => (onfinish && onfinish(code)))
    }).on('error', err => {
      onerror && onerror(err.message)
    })
  }
}

module.exports = download
