const path = require('path')
const diagnose = require('../../src/diagnose')

// const filePath = path.resolve(__dirname, '../vue/div.vue')
const filePath = path.resolve(__dirname, '../jsbundle/list.js')

diagnose(filePath)
