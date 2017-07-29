const _ = require('lodash')
const runtime = require('./runtime.js')

const uniqueId = (() => {
  let uid = 1
  return () => (uid++).toString()
})()

const URLRE = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i
function isURL (filePath) {
  return URLRE.test(filePath)
}

function isChinese (str) {
  return /^[\u4e00-\u9fa5]$/.test(str)
}

function sizeof (param) {
  if (param && typeof param === 'object') {
    param = JSON.stringify(param)
  }
  return String(param).split('')
    .map(c => isChinese(c) ? 2 : 1)
    .reduce((a, b) => a + b)
}

function leftPad (str, N, space = ' ') {
  return space.repeat(N - sizeof(str)) + str
}

function rightPad (str, N, space = ' ') {
  return str + space.repeat(N - sizeof(str))
}

function centerPad (str, N, space = ' ') {
  const left = (N - sizeof(str)) >> 1
  return rightPad(space.repeat(left) + str, N, space)
}

function getPadFunction (align) {
  switch (align) {
    case 'left': return rightPad
    case 'right': return leftPad
  }
  return centerPad
}

function mapObject (object, fn) {
  const result = {}
  for (const key in object) {
    result[key] = fn(object[key], key)
  }
  return result
}

// 当前的微秒数
function microsecond () {
  const time = process.hrtime()
  return time[0] * 1e6 + time[1] / 1e3
}

const versionRegExp = /^\s*\/\/ *(\{[^}]*\}) *\r?\n/
function getJSBundleType (code) {
  const res = versionRegExp.exec(code)
  if (res) {
    return JSON.parse(res[1]).framework
  }
  return ''
}

function isVueBundle (text) {
  return getJSBundleType(text) === 'Vue'
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

function accumulate (object, key, step = 1) {
  object[key] = object[key] || 0
  object[key] += step
}

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function forEachNode ($root, fn, options = {}) {
  if (!$root) return
  if (!options.parent) {
    options.depth = 1
    options.path = $root.type
  }
  fn.apply(null, [$root, options])
  if ($root.children && $root.children.length) {
    $root.children.forEach(node => {
      forEachNode(node, fn, {
        parent: $root,
        depth: options.depth + 1,
        path: `${options.path} -> ${node.type}`
      })
    })
  }
}

function objectToArray (object) {
  const array = []
  for (const key in object) {
    array.push({ key, value: object[key] })
  }
  return array
}

module.exports = Object.assign({
  uniqueId,
  isURL,
  isChinese,
  sizeof,
  leftPad,
  rightPad,
  centerPad,
  getPadFunction,
  mapObject,
  microsecond,
  convertURL,
  accumulate,
  deepClone,
  forEachNode,
  objectToArray,
  getJSBundleType,
  isVueBundle,
  isVueFile
}, runtime)
