const fs = require('fs')
const path = require('path')

const excludePaths = [
  /^\./,
  /^node_modules$/
]

function isValidPath (filePath) {
  return fs.lstatSync(filePath).isDirectory()
    && !excludePaths.some(regex => regex.test(filePath))
}

function isValidFile (fileName) {
  return fs.lstatSync(fileName).isFile()
    && path.extname(fileName) === '.vue'
}

function walk (entryPath) {
  const stats = fs.lstatSync(entryPath)
  if (stats.isFile()) {
    // console.log(` => is file ${entryPath}`)
    return [entryPath]
  } else if (stats.isDirectory()) {
    const subPaths = fs.readdirSync(entryPath)
    const results = []
    if (subPaths.length) {
      for (let i = 0; i < subPaths.length; ++i) {
        const pathName = path.join(entryPath, subPaths[i])
        if (isValidPath(pathName)) {
          results.push(...walk(pathName))
        } else if (isValidFile(pathName)) {
          results.push(pathName)
        }
      }
      return results
    }
  }
}

module.exports = walk
