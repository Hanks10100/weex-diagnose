const _ = require('lodash')
const platform = require('./platform')

const uniqueId = (() => {
  let uid = 1
  return () => (uid++).toString()
})()

function isChinese (str) {
  return /^[\u4e00-\u9fa5]$/.test(str)
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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
  const styleRE = /<\s*style\s*\w*>([^]*)<\/\s*style\s*>/
  const scriptRE = /<\s*script.*>([^]*)<\/\s*script\s*>/
  const templateRE = /<\s*template\s*>([^]*)<\/\s*template\s*>/
  return templateRE.test(text)
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

function mergeResult (summary, object) {
  for (const key in summary) {
    if (Array.isArray(object[key])) {
      summary[key].push(...object[key])
      summary[key].sort((a, b) => {
        return (a.line !== b.line)
          ? a.line - b.line
          : a.column - b.column
      })
    }
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
  isChinese,
  delay,
  sizeof,
  leftPad,
  rightPad,
  centerPad,
  getPadFunction,
  mapObject,
  accumulate,
  deepClone,
  forEachNode,
  mergeResult,
  objectToArray,
  getJSBundleType,
  isVueBundle,
  isVueFile
}, platform)
