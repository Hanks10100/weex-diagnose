const { printTable } = require('./print')

function isVNode (vnode) {
  return (vnode && typeof vnode === 'object')
    && vnode.type
    && vnode.ref
}

function toString (param) {
  if (Array.isArray(param)) {
    return param.map(toString).join(', ')
  }
  if (isVNode(param)) {
    return `<${param.type} ref="${param.ref}">`
    // return JSON.stringify(param)
  }
  if (typeof param === 'string') {
    return `"${param}"`
  }
  return param
}

function mapObject (object, fn) {
  const result = {}
  for (const key in object) {
    result[key] = fn(object[key], key)
  }
  return result
}

function printHistory (history) {
  // console.log(history)
  if (Array.isArray(history)) {
    console.log()
    printTable(history.map(obj => mapObject(obj, toString)))
    // history.forEach(({ module, method, args }) => {
    //   console.log(`${module}.${method}(${args.map(toString).join(', ')})`)
    // })
  }
}

module.exports = printHistory
