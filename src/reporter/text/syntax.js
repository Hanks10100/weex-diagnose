const _ = require('lodash')

function printSyntaxLint (syntax) {
  let errorCount = {
    template: 0,
    style: 0,
    script: 0
  }
  if (syntax.template) {
    const { location , messages } = syntax.template
    if (messages.length) {
      console.log(`\n    <template> (start at line ${location.line})`)
    }
    messages.forEach(message => {
      errorCount.template++
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
        const line = location.line + message.line - 1
        const column = location.column + message.column - 1
        errorCount.style++
        console.log(`    ${line}:${column} ${message.reason}`)
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
          errorCount.script++
          const line = location.line + record.line - 1
          const column = location.column + record.column - 1
          console.log(`    ${line}:${column} ${record.message}`)
        })
      })
    })
  }

  if (errorCount.template + errorCount.style + errorCount.script) {
    let str = ' => [Test Failed]  '
    for (const type in errorCount) {
      if (errorCount[type] > 0) {
        str += `<${type}>: ${errorCount[type]}  `
      }
    }
    console.log(`\n${str}\n`)
  } else {
    console.log(' => All the syntax lints are passed!\n')
  }
  // console.log(`\n\n`)
}

module.exports = printSyntaxLint
