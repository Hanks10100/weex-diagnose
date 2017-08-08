const eslint = require('./eslint')
const { getJSBundleType } = require('../utils')
const compileVue = require('./vue')

// TODO: 检测代码是否需要编译
function shouldCompile (text, options) {
  return true
}

function injectGlobalTask (code) {
  const bundleType = getJSBundleType(code)
  if (bundleType === 'Vue') {
    const methodName = `__INJECT_${bundleType.toUpperCase()}__`
    return `
      // { "framework": "${bundleType}" }

      ;if (typeof ${methodName} === 'function') ${methodName}(weex, ${bundleType});

      ${code}
    `
  }
  return code
}

function compile (text, analyser, options) {
  if (shouldCompile(text, options)) {
    // TODO: 编译 text 源码
    console.log('shouldCompile')
    compileVue('xxx', text, 'native').then(res => {
      console.log(` => done`)
      console.log(res.code)
    })
  }

  // eslint(text, analyser)

  return new Promise(resolve => resolve(injectGlobalTask(text)))
}

module.exports = compile
