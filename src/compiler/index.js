const md5 = require('md5')
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

const codeCaches = {}
async function compile (text, analyser, options) {
  // TODO: 校验源码格式
  if (shouldCompile(text, options)) {
    const hash = md5(text)
    if (codeCaches[hash]) {
      // console.log(` => use cache`)
      return codeCaches[hash]
    }

    // console.log(' => compiling the source code')
    const res = await compileVue(text)
    eslint(res.code, analyser)
    codeCaches[hash] = res.code
    return res.code
  }

  eslint(text, analyser)
  return injectGlobalTask(text)
}

module.exports = compile
