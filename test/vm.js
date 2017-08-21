const vm = require('vm')

const runtimeSandbox = {
  console,
  weex: {
    document: {},
    requireModule (name) {
      return name
    }
  }
}

vm.createContext(runtimeSandbox)

const codeA = `
  const meta = weex.requireModule('meta')
  console.log(meta)
  this.meta = meta
`
const codeB = `
  const stream = weex.requireModule('stream')
  console.log(stream)
  this.stream = stream
`

// vm.runInContext(codeA, runtimeSandbox)
// vm.runInContext(codeB, runtimeSandbox)
vm.runInNewContext(codeA, Object.create(runtimeSandbox))
vm.runInNewContext(codeB, Object.create(runtimeSandbox))

console.log(runtimeSandbox)

const vm = require('vm')

// runtimeContext 是所有实例共用的执行环境
function createInstance(id, code, runtimeContext) {
  // 当前页面用到的 api，由 DSL 框架提供
  const instanceAPIs = { /* ... */ }

  // 准备执行环境
  const context = Object.create(runtimeContext, instanceAPIs)
  vm.createContext(context)

  // 执行可复用代码（通用组件、模块）
  vm.runInContext(deps, context /* or runtimeContext */)

  // 执行业务代码
  vm.runInContext(code, context)
}


(function(){
  const globalScope = { setTimeout }
  const runtimeScope = Object.create(globalScope, { WXEnvironment: {} })
  const instanceScope = Object.create(runtimeScope, { weex: {} })
  instanceScope.abc = 'abc'
  console.dir(instanceScope)
})()
