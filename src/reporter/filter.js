const reportFilters = [
  // Styles filters.
  {
    rule: /<style> must be scoped/,
    type: 'error',
    id: 'no-use-scoped'
  },
  {
    rule: /this file is using stylus, the line number in <style> will be mismatch/,
    type: 'warn',
    id: 'use-sylus'
  },
  {
    rule: /(may not be supported)/,
    type: 'warn',
    id: 'no-standard-style-prop'
  },
  {
    rule: /(could be removed)/,
    type: 'warn',
    id: 'no-useless-style-prop'
  },
  {
    rule: /Weex only support single-classname selector/,
    type: 'warn',
    id: 'no-muti-classname'
  },
  {
    rule: /(supported values are: `.+`)/,
    type: 'warn',
    id: 'no-supported-style-value'
  },
  {
    rule: /property may have compatibility problem on native/,
    type: 'warn',
    id: 'no-compatible-prop'
  },
  {
    rule: /null/,
    type: 'error',
    id: 'script-syntax-error'
  }
]

const messageFilters = [
  {
    name: 'style',
    rule: /CssSyntaxError/,
    type: 'error',
    id: 'css-syntax-error'
  },
  {
    name: 'template',
    rule: /tag <.+> has no matching end tag/,
    type: 'error',
    id: 'template-syntax-error'
  }
]

module.exports = {
  reportFilters,
  messageFilters
};