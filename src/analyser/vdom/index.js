const getSummary = require('./summary')
const validateNode = require('./rules/node')
const validateStyles = require('./rules/styles')
const validateRelation = require('./rules/relation')

function validate ($root) {
  const nodeWarns = validateNode($root)
  const styleWarns = validateStyles($root)
  const relationWarns = validateRelation($root)
  return {
    warning: [].concat(nodeWarns, styleWarns, relationWarns)
  }
}

function analyseVdom ($root) {
  const summary = getSummary($root)
  const result = validate($root)

  return { summary }
}

module.exports = analyseVdom
