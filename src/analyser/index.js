const _ = require('lodash')
const analyseVdom = require('./vdom')
const analyseLogs = require('./logs')
const analyseHistory = require('./history')
const analyseException = require('./exception')

class Analyser {
  constructor () {
    this._raw = {
      history: {},
      summary: {},
      logs: {},
      vdom: {}
    }
  }

  takeRecord (type, content) {
    // console.log(` => take record form ${type}`)
    if (type === 'runner' && this._raw) {
      Object.assign(this._raw, content)
      return
    }

    if (type === 'lifecycle' && this._raw) {
      this._raw.lifecycle = this._raw.lifecycle || []
      this._raw.lifecycle.push(content)
      // console.log(content)
      return
    }

    if (_.isPlainObject(content)) {
      this._raw[type] = this._raw[type] || {}
      Object.assign(this._raw[type], content)
    } else {
      this._raw[type] = content
    }
  }

  analyse () {
    // console.log(' => start analyse')
    this.logs = analyseLogs(this._raw.logs)
    this.vdom = analyseVdom(this._raw.vdom)
    this.history = analyseHistory(this._raw.history)
    this.exception = analyseException(this._raw.exception)
  }

  getResult () {
    this.analyse()
    const { logs, vdom, history, exception, _raw } = this
    return {
      history: history.records,
      logs: logs.records,
      summary: Object.assign({
        bundleSize: _raw.bundleSize
      }, vdom.summary, history.summary),
      vdom: vdom
    }
  }
}

module.exports = Analyser
