const _ = require('lodash')
const analyseVdom = require('./vdom')
const analyseLogs = require('./logs')
const analyseHistory = require('./history')
const analyseException = require('./exception')

class Analyser {
  constructor () {
    this._raw = {
      lifecycle: [],
      eslint: [],
      history: {},
      summary: {},
      logs: {},
      vdom: {}
    }
    this.warnings = []
    this.errors = []
  }

  takeRecord (type, record) {
    // console.log(` => take record form ${type}`)

    switch (type) {
      case 'runner': {
        Object.assign(this._raw, record)
      } break

      case 'lifecycle': {
        record.type = 'lifecycle'
        this._raw.lifecycle.push(record)
      } break

      case 'eslint': {
        record.type = 'eslint'
        if (this.shouldTakeEslintRecord(record)) {
          this._raw.eslint.push(record)
          // console.log(this._raw.eslint)
        }
      } break

      default: {
        if (_.isPlainObject(record)) {
          this._raw[type] = this._raw[type] || {}
          Object.assign(this._raw[type], record)
        } else {
          this._raw[type] = record
        }
      }
    }
  }

  shouldTakeEslintRecord (record) {
    const { ruleId, source } = record
    if (ruleId === 'no-unused-vars') {
      return !/_vm\._self\._c/.test(source)
    }
    return true
  }

  analyse () {
    // console.log(' => start analyse')
    this.vdom = analyseVdom(this._raw.vdom)
    this.history = analyseHistory(this._raw.history)
    this.exception = analyseException(this._raw.exception)

    const [warnings, errors] = _.partition(this._raw.eslint, { severity: 1 })
    this.warnings.push(...warnings)
    this.errors.push(...errors)
    // console.log(warnings)

    const logs = analyseLogs(this._raw.logs)
    this.warnings.push(...logs.warnings)
    this.errors.push(...logs.errors)
    this.messages = logs.messages
  }

  getResult () {
    this.analyse()
    const { logs, vdom, history, exception, _raw } = this
    return {
      warnings: this.warnings,
      errors: this.errors,
      history: history.records,
      messages: this.messages,
      summary: Object.assign({
        bundleSize: _raw.bundleSize
      }, vdom.summary, history.summary),
      vdom: vdom
    }
  }
}

module.exports = Analyser
