const _ = require('lodash')
const { microsecond } = require('../utils')

module.exports = {
  install (Vue, options) {
    const { analyser } = options

    function takeLifecycleRecord (lifecycle, context) {
      const { $options } = context
      analyser.takeRecord('lifecycle',
        Object.assign({
          framework: 'Vue',
          lifecycle,
          count: $options[lifecycle].length - 1,
          time: microsecond(),
          $options: _.pick($options, [
            'el', '__file', 'style', 'data',
            'components', 'directives', 'filters', 'methods'
          ])
        },
        _.pick(context, '$refs', '$slots', '$vnode', '$attrs')
      ))
    }

    Vue.mixin({
      beforeCreate ()  { takeLifecycleRecord('beforeCreate', this) },
      created ()       { takeLifecycleRecord('created', this) },
      beforeMount ()   { takeLifecycleRecord('beforeMount', this) },
      mounted ()       { takeLifecycleRecord('mounted', this) },
      beforeUpdate ()  { takeLifecycleRecord('beforeUpdate', this) },
      updated ()       { takeLifecycleRecord('updated', this) },
      beforeDestroy () { takeLifecycleRecord('beforeDestroy', this) },
      destroyed ()     { takeLifecycleRecord('destroyed', this) }
    })
  }
}
