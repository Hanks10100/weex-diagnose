const fs = require('fs')
const url = require('url')

// 当前的微秒数
function microsecond () {
  const time = process.hrtime()
  return time[0] * 1e6 + time[1] / 1e3
}

function readFile (filePath, callback) {
  // console.log(' => readFile:', filePath)
  fs.readFile(filePath, 'utf8', (err, text) => {
    if (err) return console.log(err)
    callback && callback(text)
  })
}

function writeFile (filePath, content, callback) {
  // console.log(' => writeFile:', filePath)
  fs.writeFile(filePath, content, (err, text) => {
    if (err) return console.log(err)
    callback && callback(text)
  })
}

const URLRE = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i
function isURL (filePath) {
  return URLRE.test(filePath)
}

const dotweRE = /^(https?\:\/\/dotwe\.org)\/(vue|weex)\/(\w+)$/i
const wxtplRE = /^(https?\:\/\/.+)\?\_wx\_tpl\=(https?\:\/\/.+)$/i
const tmallRE = /^https?\:\/\/pages\.tmall\.com.+\?\wh\_weex\=true/i
function convertURL (url) {
  // 解析 dotwe 中的链接
  if (url.match(dotweRE)) {
    return url.replace(dotweRE, ($, host, type, hash) => {
      return `${host}/raw/dist/${hash}.bundle.${type === 'weex' ? 'js' : 'wx'}`
    })
  }

  // 解析 playground 的拦截规则
  if (url.match(wxtplRE)) {
    return url.replace(wxtplRE, ($, mock, real) => real)
  }

  if (url.match(tmallRE)) {
    return url.replace('?wh_weex', '?wh_native')
  }
  return url
}

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

function getContent (filePath, options = {}) {
  return new Promise((resolve, reject) => {
    if (isURL(filePath)) {
      download(filePath, resolve, reject)
    } else {
      readFile(filePath, resolve, reject)
    }
  })
}

module.exports = {
  microsecond,
  readFile,
  writeFile,
  isURL,
  convertURL,
  download,
  getContent
}
