const { accumulate } = require('../utils')

const logRE = /^\[([\w\s]+)\][\s\:]+(.*)/i
function parseLogText (text) {
  // console.log(`"${text}"`)
  let type = 'normal'
  const res = String(text).match(logRE)
  if (res) {
    const [original, from, info] = res
    type = from.toLowerCase()
    // console.log(info)
  }
  return { type, text: text.replace(/\n/g, ' ') }
}

function analyseLogs (logs) {
  // console.log(` => analyse logs`, logs)
  const summary = {}
  const messages = {}
  const warnings = []
  const errors = []
  if (Array.isArray(logs)) {
    logs.forEach(log => {
      const level = log.level
      const formatted = parseLogText(log.text)
      log.type = formatted.type
      log.text = formatted.text

      accumulate(summary, level)

      if (level === 'warn') {
        warnings.push(log)
      }
      if (level === 'error') {
        errors.push(log)
      }

      messages[level] = messages[level] || []
      messages[level].push(log)
      // console.log(log.text)
    })
  }
  // console.log(records)
  return { messages, warnings, errors, summary }
}

module.exports = analyseLogs
