// Memory File System

const path = require('path')
const MemoryFileSystem = require('memory-fs')
const fs = new MemoryFileSystem()
const directory = path.join(process.cwd(), 'raw')

fs.mkdirpSync(directory)

exports.fs = fs
