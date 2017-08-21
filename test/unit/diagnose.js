const path = require('path')
const diagnose = require('../../src')

diagnose([
  path.resolve(__dirname, '../vue/div.vue'),
  path.resolve(__dirname, '../jsbundle/list.js')
]).then(results => {
  // console.log(results)
})
