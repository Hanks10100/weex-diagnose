const { getJSBundleType } = require('../utils')

// TODO: 检测代码是否需要编译
function shouldCompile (text, options) {
  return false
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

function compile (text, options) {
  if (shouldCompile(text, options)) {
    // TODO: 编译 text 源码
  }
  return new Promise(resolve => resolve(injectGlobalTask(text)))
}

module.exports = compile
