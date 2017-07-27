const runtime = require('./runtime.js')

const URLRE = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i
function isURL (filePath) {
  return URLRE.test(filePath)
}

function isVueBundle (text) {
  return true
}

function isVueFile (text) {
  return false
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

module.exports = Object.assign({
  isURL,
  convertURL,
  isVueBundle,
  isVueFile
}, runtime)
