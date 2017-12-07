const _ = require('lodash')
const { accumulate, mergeResult, sizeof } = require('../utils')

function parseTemplate (template) {
  const { location , messages } = template
  const summary = {
    tips: [],
    warnings: [],
    errors: []
  }
  if (messages.length) {
    console.log(`\n    <template> (start at line ${location.line})`)
  }
  messages.forEach(message => {
    // TODO: collect template messages
    console.log(`    ${message}`)
  })
  return summary
}

const styleMessageRE = /^(error|note|warning)\s*\:\s+/i
function parseStyle (styles = []) {
  const summary = {
    tips: [],
    warnings: [],
    errors: []
  }
  _.flatten(styles).forEach(({ location, messages }) => {
    // if (messages.length) {
    //   console.log(`\n    <style> (start at line ${location.line})`)
    // }
    messages.forEach(message => {
      const result = { type: 'style' }
      result.ruleId = message.reason
      result.line = location.line + message.line - 1
      result.column = location.column + message.column - 1
      result.message = message.reason
      result.source = message.source
      // console.log(`    ${result.line}:${result.column} ${message.reason}`)
      let array = summary.tips
      const match = styleMessageRE.exec(message.reason)
      if (match) {
        switch (match[1].toLocaleLowerCase()) {
          case 'note': array = summary.tips; break
          case 'warning':
          case 'error': array = summary.warnings; break
        }
      }
      array.push(result)
    })
  })
  return summary
}

function parseScript (scripts = []) {
  const summary = {
    tips: [],
    warnings: [],
    errors: []
  }
  _.flatten(scripts).forEach(({ location, messages }) => {
    // if (messages[0] && messages[0].messages.length) {
    //   console.log(`\n    <script> (start at line ${location.line})`)
    // }
    _.flatten(messages).forEach(result => {
      // console.log(`    ${record.line}:${record.column} ${record.message}`)
      if (!Array.isArray(result.messages)) return;
      result.messages.forEach(record => {
        const formatted = { type: 'eslint' }
        formatted.ruleId = record.ruleId
        formatted.line = location.line + record.line - 1
        formatted.column = location.column + record.column - 1
        formatted.message = record.message
        formatted.source = record.source
        switch (record.severity) {
          case 0: summary.tips.push(formatted); break
          case 1: summary.warnings.push(formatted); break
          case 2: summary.errors.push(formatted); break
        }
        // console.log(`    ${formatted.line}:${formatted.column} ${record.message}`)
      })
    })
  })
  return summary
}

function analyseSyntax (syntax = {}) {
  // console.log(`\n\n => analyse syntax`, syntax)
  const errorCount = {
    template: 0,
    style: 0,
    script: 0
  }
  const results = {
    tips: [],
    warnings: [],
    errors: []
  }
  if (syntax.template && syntax.template.messages) {
    mergeResult(results, parseTemplate(syntax.template))
  }
  if (syntax.style && syntax.style.length) {
    mergeResult(results, parseStyle(syntax.style))
  }
  if (syntax.script && syntax.script.length) {
    mergeResult(results, parseScript(syntax.script))
  }
  // console.log(results)
  return results
}

module.exports = analyseSyntax
