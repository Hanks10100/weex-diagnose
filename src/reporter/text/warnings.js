function printEslint (record = {}) {
  const { ruleId, message, line, column, source } = record
  console.log(` => (${ruleId}) ${message} `)
  console.log(`    ${line}:${column}  ${source}`)
}

function printConsole (record = {}) {
  const { type, text } = record
  console.log(`    ${text}`)
}

function printMessages (records, level) {
  console.log(` => ${level} count: ${records.length}`)
  records.forEach(record => {
    switch (record.type) {
      case 'eslint': printEslint(record); break
      case 'vue warn': printConsole(record); break
    }
  })
}

function printWarnings (records = []) {
  if (records.length) {
    console.log(`\n --------------------------- warnings ---------------------------`)
    printMessages(records, 'warning')
  }
}

function printErrors (records = []) {
  if (records.length) {
    console.log(`\n ---------------------------- errors ----------------------------`)
    printMessages(records, 'error')
  }
}

module.exports = {
  printMessages,
  printWarnings,
  printErrors
}
