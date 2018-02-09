const jsonfile = require('jsonfile')
const textReporter = require('./text')
const {reportFilters, messageFilters} = require('./filter')

function writeReports (reports, options = []) {
  let target = './report.json'
  const output = []
  options.forEach((opt, i) => {
    if (opt.output) {
      target = opt.output
      output.push(reports[i])
    }
  })
  // console.log(` => Write reports to`, target)
  jsonfile.spaces = 2
  return jsonfile.writeFile(target, output)
}

function report (reports = [], options = []) {
  let standardReports = reports.map((x, i) => filterReport(x, options[i]))
  writeReports(standardReports, options)
  if (!options.silent) {
    // TODO: refactor text reporter
    standardReports.forEach((x, i) => {
      x.forEach(y => textReporter(y, options[i]))
    })
  }
  return standardReports
}
// const rulePipe =
function filterReport (reports = [], options = {}) {
  reports.forEach(result => {
    delete result.history
    delete result.syntax
    // delete result.messages
    delete result.vdom
    if (result.summary) {
      delete result.summary.layers
      delete result.summary.cssProps
      delete result.summary.callCount
    }
    // filter report rule
    const warnings = result.warnings;
    const errors = result.errors;
    const tips = result.tips;
    const messages = result.messages;
    warnings.map(warn => {
      reportFilters.forEach(filter => {
        if (filter.rule.test(warn.ruleId)) {
          warn.ruleId = filter.id;
        }
      })
      return warn;
    })

    errors.forEach(error => {
      reportFilters.forEach(filter => {
        if (filter.rule.test(error.ruleId)) {
          error.ruleId = filter.id;
        }
      })
      return error;
    })

    tips.forEach(tip => {
      reportFilters.forEach(filter => {
        if (filter.rule.test(tip.ruleId)) {
          tip.ruleId = filter.id;
        }
      })
      return tip;
    })

    messages.forEach(message => {
      messageFilters.forEach(filter => {
        if (filter.rule.test(message)) {
          let res = {
            type: filter.name,
            ruleId: filter.id,
            line: 0,
            column: 0,
            message: '',
            source: ''
          };
          if (filter.name === 'template') {
            res.message = message;
            res.source = 'The tempalte error can not map to source code now, please check it by yourself.';
          }
          else {
            const lineReg = /line: (\d+)/i; 
            message.replace(lineReg, function() { 
              res.line = +arguments[1];
            }); 
            const columnReg = /column: (\d+)/i; 
            message.replace(columnReg, function() { 
              res.column = +arguments[1];
            }); 
            const sourceReg = /source: '(.+)'/i; 
            message.replace(sourceReg, function() { 
              res.source = arguments[1];
            }); 
            const messageReg = /message: '(.+)'/i; 
            message.replace(messageReg, function() { 
              res.message = arguments[1];
            });
          }
          result[`${filter.type}s`].push(res);
        }
      })
    })
  })
  return reports
}

module.exports = report
