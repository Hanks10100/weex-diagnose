const fs = require('fs')
const path = require('path')

function walk (entryPath) {
  const stats = fs.lstatSync(entryPath)
  if (stats.isFile()) {
    console.log(` => is file ${entryPath}`)
    return [entryPath]
  } else if (stats.isDirectory()) {
    const subPaths = fs.readdirSync(entryPath)
    const results = []
    if (subPaths.length) {
      for (let i = 0; i < subPaths.length; ++i) {
        const pathName = path.join(entryPath, subPaths[i])
        if (fs.lstatSync(pathName).isDirectory()) {
          results.push(...walk(pathName))
        } else if (path.extname(pathName) === '.vue') {
          results.push(pathName)
        }
      }
      return results
    }
  }
}

module.exports = walk
