const cheerio = require('cheerio')
const lintScript = require('./script')
const lintStyle = require('./style')
const lintTemplate = require('./template')

function linter (code, options) {
  // console.log(code)
  const $ = cheerio.load(code)
  Array.from($('style')).forEach($style => lintStyle($style))
  Array.from($('script')).forEach($script => lintScript($script))
  lintTemplate($('template').html())
  console.log(`\n`)
}

module.exports = linter
