const CLIEngine = require('eslint').CLIEngine
const eslintConfigs = require('../compiler/configs/eslintrc.js')

function lintScript (jscode) {
  const cli = new CLIEngine(eslintConfigs)
  const { results } = cli.executeOnText(jscode)
  return results
}

module.exports = lintScript
