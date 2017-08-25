const _ = require('lodash')
const propsLabel = require('./text/labels')
const formatter = require('./text/formatter')
const { printTable } = require('./text/print')

const supportedProps = [
  'bundleSize', 'totalCount', 'totalDepth', 'messageSize', 'timecost'
]

function toReadable (array) {
  return array.map((object, i) => {
    const readable = { 'No.': i+1 }
    for (const key in object) {
      const { label, type } = propsLabel[key]
      readable[label] = formatter(type, object[key])
      // readable[key] = formatter(type, object[key])
    }
    return readable
  })
}

function compareReports (reportGroup = []) {
  let compareTable = []
  reportGroup.forEach(reports => {
    const { results, averange, info } = parseResult(reports)
    compareTable.push(averange)
    const table = Array.from(results)
    if (reports.length > 1) {
      table.push(averange)
    }

    console.log(`\nsrc: ${info.src}`)
    printTable(table)
  })

  const N = reportGroup.length

  if (N === 2) {
    const [A, B] = compareTable
    const rate = { 'No.': 'compare' }
    for (const key in B) {
      rate[key] = (100 * B[key] / A[key]).toFixed(2) + '%'
    }
    compareTable = toReadable(compareTable)
    compareTable.push(rate)
  } else {
    compareTable = toReadable(compareTable)
  }

  if (N > 1) {
    console.log(`\nCompare the ${N} results:`)
    printTable(compareTable)
  }
}

function parseResult (reports = []) {
  if (Array.isArray(reports)) {
    const info = _.sample(reports).info
    const results = []
    const summary = {}
    reports.forEach((report, i) => {
      const chosenSummary = _.pick(report.summary, supportedProps)
      const readable = { '序号': i+1 }
      for (const prop in chosenSummary) {
        const { label, type } = propsLabel[prop]
        if (summary[prop] === undefined) {
          summary[prop] = 0
        }
        summary[prop] += chosenSummary[prop]
        readable[label] = formatter(type, chosenSummary[prop])
      }
      results.push(readable)
    })

    const N = reports.length
    const averange = {}
    for (const key in summary) {
      averange[key] = summary[key] / N
    }

    return { results, averange, info }

    // const table = [supportedProps.map(n => propsLabel[n].label)]
    //   .concat(reports.map(report => {
    //     const chosenSummary = _.pick(report.summary, supportedProps)
    //     const readable = []
    //     for (const prop in chosenSummary) {
    //       const { label, type } = propsLabel[prop]
    //       readable.push(formatter(type, chosenSummary[prop]))
    //     }
    //     return readable
    //   }))
    // const result = _.unzip(table)
    // printTable(result)
  }
}

module.exports = compareReports
