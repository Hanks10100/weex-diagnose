const semver = require('semver')
const Weex = require('weex-legacy-framework')
const Vanilla = require('weex-vanilla-framework')
const Rax = require('weex-rax-framework')

function getVue (version) {
  if (version) {
    const folder = `${semver.major(version)}.${semver.minor(version)}.${semver.patch(version)}`
    return require(`weex-vue-framework-packages/${folder}/${version}`)
  }
  return require('weex-vue-framework')
}

function getFrameworks (options = {}) {
  return {
    Weex,
    Vanilla,
    Vue: getVue(options['weex-vue-framework']),
    Rax
  }
}

module.exports = getFrameworks
