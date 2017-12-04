const _ = require('lodash')
const { accumulate, sizeof } = require('../utils')

const skipWarnRE = /^NOTE\:\s+/

function parseTemplate (template, summary = {}) {
  const { location , messages } = template
  if (messages.length) {
    console.log(`\n    <template> (start at line ${location.line})`)
  }
  messages.forEach(message => {
    summary.template++
    console.log(`    ${message}`)
  })
}

function parseStyle (styles = [], summary = {}) {
  _.flatten(styles).forEach(({ location, messages }) => {
    if (messages.length) {
      console.log(`\n    <style> (start at line ${location.line})`)
    }
    messages.forEach(message => {
      const line = location.line + message.line - 1
      const column = location.column + message.column - 1
      if (!skipWarnRE.test(message.reason)) {
        summary.style++
      }
      console.log(`    ${line}:${column} ${message.reason}`)
    })
  })
}

function parseScript (scripts = [], summary = {}) {
  _.flatten(scripts).forEach(({ location, messages }) => {
    if (messages[0] && messages[0].messages.length) {
      console.log(`\n    <script> (start at line ${location.line})`)
    }
    _.flatten(messages).forEach(result => {
      // console.log(`    ${record.line}:${record.column} ${record.message}`)
      if (!Array.isArray(result.messages)) return;
      result.messages.forEach(record => {
        summary.script++
        const line = location.line + record.line - 1
        const column = location.column + record.column - 1
        console.log(`    ${line}:${column} ${record.message}`)
      })
    })
  })
}

function analyseSyntax (syntax = {}) {
  // console.log(`\n\n => analyse syntax`, syntax)
  const errorCount = {
    template: 0,
    style: 0,
    script: 0
  }
  if (syntax.template && syntax.template.messages) {
    parseTemplate(syntax.template, errorCount)
  }
  if (syntax.style && syntax.style.length) {
    parseStyle(syntax.style, errorCount)
  }
  if (syntax.script && syntax.script.length) {
    parseScript(syntax.script, errorCount)
  }
  return syntax
}

module.exports = analyseSyntax
