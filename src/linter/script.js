const CLIEngine = require('eslint').CLIEngine
const eslintConfigs = require('../compiler/configs/eslintrc.js')

function lintScript (jscode, node) {
  const cli = new CLIEngine(eslintConfigs)
  // console.log(attrs)
  // console.log(jscode)
  const { results } = cli.executeOnText(jscode)

  return results

  // if (results.length && results[0].messages.length) {
  //   console.log(`\n    <script>`)
  // }

  // results.forEach(({ messages }) => {
  //   messages.forEach(record => {
  //     console.log(`    ${record.line}:${record.column} ${record.message}`)
  //   })
  // })
}

module.exports = lintScript
