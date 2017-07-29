function printEslint (record = {}) {
  const { ruleId, message, line, column, source } = record
  console.log(` => (${ruleId}) ${message} `)
  console.log(`    ${line}:${column}  ${source}`)
}

function printMessages (records, level) {
  console.log(` => ${level} count: ${records.length}`)
  records.forEach(record => {
    switch (record.type) {
      case 'eslint': printEslint(record); break
    }
  })
}

function printWarnings (records = []) {
  if (records.length) {
    console.log(`\n --------------------------- Warnings ---------------------------`)
    printMessages(records, 'warning')
  }
}

function printErrors (records = []) {
  if (records.length) {
    console.log(`\n ---------------------------- Errors ----------------------------`)
    printMessages(records, 'error')
  }
}

module.exports = {
  printMessages,
  printWarnings,
  printErrors
}
