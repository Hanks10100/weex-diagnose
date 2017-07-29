const _ = require('lodash')
const { printTable } = require('./print')

function isElement (vnode) {
  return (vnode && typeof vnode === 'object')
    && vnode.type
    && vnode.ref
}

function normalize (param) {
  if (Array.isArray(param)) {
    return param.map(normalize)
  }
  if (isElement(param)) {
    return `<${param.type} ref="${param.ref}">`
    // return JSON.stringify(param)
  }
  if (_.isPlainObject(param)) {
    return JSON.stringify(param)
  }
  if (typeof param === 'string') {
    return `"${param}"`
  }
  if (param === -1) {
    return ''
  }
  return param
}

function normalizeArguments (args) {
  return _.compact(_.flatten(args.map(normalize)))
}

function formatRecord ({ module, method, args, time }) {
  return [
    _.padStart(module, 5),
    _.padEnd(method, 11),
    normalizeArguments(args).join(', '),
    time
  ]
}

function formatHistory (history) {
  return [Object.keys(history[0])].concat(
    history.map(formatRecord)
  )
}

function printHistory (history) {
  if (Array.isArray(history)) {
    console.log()
    // printTable(history.map(formatRecord))
    history.map(formatRecord).forEach(([module, method, args, time]) => {
      console.log(`${module}.${method}(${args})`)
    })
  }
}

module.exports = printHistory
