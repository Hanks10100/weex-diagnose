const _ = require('lodash')

const ignoreStyleMessage = [
  /^NOTE\: unit \`px\` is not supported/,
  /^NOTE\: property value \`\#\w{3}\`/
]

function printSyntaxLint (syntax) {
  if (syntax.template) {
    const { location , messages } = syntax.template
    if (messages.length) {
      console.log(`\n    <template> (start at line ${location.line})`)
    }
    messages.forEach(message => {
      console.log(`    ${message}`)
    })
  }

  if (syntax.style) {
    // console.log(syntax.style)
    _.flatten(syntax.style).forEach(({ location, messages }) => {
      if (messages.length) {
        console.log(`\n    <style> (start at line ${location.line})`)
      }
      messages.forEach(message => {
        if (!ignoreStyleMessage.some(re => re.test(message.reason))) {
          const line = location.line + message.line - 1
          const column = location.column + message.column - 1
          console.log(`    ${line}:${column} ${message.reason}`)
        }
      })
    })
  }

  if (syntax.script) {
    const script = _.flatten(syntax.script)
    script.forEach(({ location, messages }) => {
      if (messages[0] && messages[0].messages.length) {
        console.log(`\n    <script> (start at line ${location.line})`)
      }
      _.flatten(messages).forEach(result => {
        // console.log(`    ${record.line}:${record.column} ${record.message}`)
        if (!Array.isArray(result.messages)) return;
        result.messages.forEach(record => {
          const line = location.line + record.line - 1
          const column = location.column + record.column - 1
          console.log(`    ${line}:${column} ${record.message}`)
        })
      })
    })
  }

  console.log(`\n\n`)
}

module.exports = printSyntaxLint
