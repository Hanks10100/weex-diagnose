const fs = require('fs')
const path = require('path')
const recursive = require('recursive-readdir')

const loadedDeps = []
const nodeModulePath = path.resolve(__dirname, '../../../node_modules')

function preLoadLoader (mfs, name) {
  if (name === 'fsevents') return
  if (loadedDeps.indexOf(name) >= 0) return

  loadedDeps.push(name)

  setTimeout(() => {
    const loaderPath = path.resolve(nodeModulePath, name)
    const loaderConfig = fs.readFileSync(path.join(loaderPath, 'package.json'))
    const loaderConfigJson = JSON.parse(loaderConfig.toString())

    // 遍历所有文件，写入内存
    recursive(loaderPath, (err, files) => {
      files.forEach(file => {
        const relativeFile = file
        const paths = relativeFile.split(path.sep).slice(1)

        paths.reduce((currentPath, pathPart, index) => {
          currentPath += path.sep + pathPart
          if (index < paths.length - 1 && !mfs.existsSync(currentPath)) {
            mfs.mkdirpSync(currentPath)
          }
          return currentPath
        }, '')

        if (path.extname(relativeFile)) {
          const content = fs.readFileSync(file, 'utf8')
          mfs.writeFileSync(relativeFile, content || ' ')
        }
      })
    })

    Object.keys(loaderConfigJson.dependencies || {}).forEach(dep => {
      preLoadLoader(mfs, dep)
    })
  })
}

module.exports = function (mfs, loaders) {
  loaders.forEach(loader => {
    preLoadLoader(mfs, loader)
  })
}
