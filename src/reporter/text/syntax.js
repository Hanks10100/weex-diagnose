const _ = require('lodash')

const ignoreStyleMessage = [
  /^NOTE\: unit \`px\` is not supported/,
  /^NOTE\: property value \`\#\w{3}\`/
]

function printSyntaxLint (syntax) {
  if (syntax.template && syntax.template.length) {
    const warns = syntax.template
    console.log(`\n    <template>`)
    warns.forEach(message => {
      console.log(`    ${message}`)
    })
  }

  if (syntax.style) {
    console.log(`\n    <style>`)
    _.flatten(syntax.style).forEach(message => {
      if (!ignoreStyleMessage.some(re => re.test(message.reason))) {
        console.log(`    ${message.line}:${message.column} ${message.reason}`)
      }
    })
  }

  if (syntax.script) {
    const script = _.flatten(syntax.script)
    if (script.length && script[0].messages.length) {
      console.log(`\n    <script>`)
    }
    script.forEach(({ messages }) => {
      messages.forEach(record => {
        console.log(`    ${record.line}:${record.column} ${record.message}`)
      })
    })
  }
}

module.exports = printSyntaxLint
