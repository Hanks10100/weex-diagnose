// TODO: 检测代码是否需要编译
function shouldCompile (text, options) {
  return false
}

function compile (text, options) {
  if (shouldCompile(text, options)) {
    // TODO: 编译 text 源码
  }
  return new Promise(resolve => resolve(text))
}

module.exports = compile
