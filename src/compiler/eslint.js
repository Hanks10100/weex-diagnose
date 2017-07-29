const CLIEngine = require('eslint').CLIEngine
const eslintConfigs = require('./configs/eslintrc.js')

// 执行 ESLint
function eslint (code, analyser, callback) {
  const cli = new CLIEngine(eslintConfigs)
  const { results } = cli.executeOnText(code)

  results.forEach(({ messages }) => {
    messages.forEach(record => {
      analyser.takeRecord('eslint', record)
    })
  })

  callback && callback()
}

module.exports = eslint
