const cheerio = require('cheerio')
const lintScript = require('./script')
const lintStyle = require('./style')
const lintTemplate = require('./template')

function linter (code, options) {
  // console.log(code)
  const $ = cheerio.load(code)
  const style = Array.from($('style')).map($style => lintStyle($style, options))
  const script = Array.from($('script')).map($script => lintScript($script, options))
  const template = lintTemplate($('template').html(), options)

  return { style, script, template }
}

module.exports = linter
