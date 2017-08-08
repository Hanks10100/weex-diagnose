const eslint = require('./eslint')
const { getJSBundleType } = require('../utils')
const compileVue = require('./transformer/vue')

// TODO: 检测代码是否需要编译
function shouldCompile (text, options) {
  const styleRE = /<\s*style\s*\w*>([^]*)<\/\s*style\s*>/
  const scriptRE = /<\s*script.*>([^]*)<\/\s*script\s*>/
  const templateRE = /<\s*template\s*>([^]*)<\/\s*template\s*>/
  return templateRE.test(text)
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
    // TODO: 校验源码格式
    return compileVue(text).then(res => {
      // console.log(` => done`, res.code)
      eslint(res.code, analyser)
      return res.code
    })
  }

  eslint(text, analyser)
  return new Promise(resolve => resolve(injectGlobalTask(text)))
}

module.exports = compile
