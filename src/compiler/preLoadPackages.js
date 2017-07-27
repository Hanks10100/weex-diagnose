// refs: https://github.com/christianalfoni/webpack-bin/issues/106

var fs = require('fs')
var path = require('path')
var recursive = require('recursive-readdir')

var loadedDeps = []

var preLoadPackage = function (memoryFs, name) {
  if (typeof name !== 'string') {
    return;
  }

  // fsevents is MAC specific
  if (name === 'fsevents') {
    return;
  }

  if (loadedDeps.indexOf(name) >= 0) {
    return;
  }
  loadedDeps.push(name);
  setTimeout(function () {
    var packagePath = path.resolve('node_modules', name);
    var packageJson = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json')).toString());

    recursive(packagePath, function (err, files) {
      files.forEach(function (file) {
        var relativeFile = file;
        var paths = relativeFile.split(path.sep).slice(1);
        paths.reduce(function (currentPath, pathPart, index) {
          currentPath += path.sep + pathPart;
          if (index < paths.length - 1 && !memoryFs.existsSync(currentPath)) {
            memoryFs.mkdirpSync(currentPath);
          }
          return currentPath;
        }, '');

        if (path.extname(relativeFile)) {
          var content = fs.readFileSync(file, 'utf8');
          memoryFs.writeFileSync(relativeFile, content || ' ');
        }
      });
    });
    Object.keys(packageJson.dependencies || {}).forEach(preLoadPackage);
  })
}

module.exports = function (mfs, packages) {
  Array.from(packages).forEach(pkg => preLoadPackage(mfs, pkg));
};
