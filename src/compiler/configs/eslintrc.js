module.exports = {
  envs: ["node", "mocha", "es6"],
  useEslintrc: false,
  root: true,
  // "globals": {
  //   "global": false,
  //   "window": false,
  //   "callNative": false,
  //   "callNativeModule": false,
  //   "callNativeComponent": false,
  //   "WXEnvironment": false,
  // },
  rules: {
    // 禁用 alert / debugger / label
    "no-alert": "error",
    "no-debugger": "error",
    "no-labels": "error",

    // 禁用 void / with   / caller / callee
    // "no-void": "warn",
    "no-with": "warn",
    "no-caller": "warn",

    // 禁止使用 new Function 或者 eval
    "no-new-func": "warn",
    "no-implied-eval": "warn",

    // 使用严格比较
    eqeqeq: "warn",

    // 禁止覆盖全局变量
    "no-global-assign": ["error"],

    // 不可隐式创建全局变量
    "no-implicit-globals": "error",

    // 禁用 window 和 global 变量
    "no-restricted-globals": ["error", "window", "global"],

    // 禁止扩展原生对象
    "no-extend-native": ["error"],

    // 禁用 __iterator__ 和 __proto__ 属性
    "no-iterator": "error",
    "no-proto": "error",

    // 不能通过实例调用 Object.prototype 中的方法
    "no-prototype-builtins": "warn",

    // 禁止使用 new 创建内置对象
    "no-new-wrappers": "warn",

    // 必须使用 isNaN 判断 NaN
    "use-isnan": "warn",

    // 不能与父作用域中的变量重名
    // "no-shadow": ["warn", {
    //   "builtinGlobals": false,
    //   "allow": ["module", "exports"]
    // }],

    // 禁止使用变量提升的特性
    // "no-use-before-define": "warn",
    // "block-scoped-var": "warn",

    // 禁止变量重复声明
    "no-redeclare": ["error", { "builtinGlobals": true }],

    // 禁止使用限制的（保留字）变量名
    "no-shadow-restricted-names": "error",

    // 禁止在 if 和 for 语句中创建函数
    "no-inner-declarations": "error",
    "no-loop-func": "error",

    // 限制不稳定的否定判断，优先级模糊
    "no-unsafe-negation": "warn",

    // 不能在 return 和 if 的判断语句中赋值
    // "no-return-assign": "warn",
    "no-cond-assign": "warn",

    // 禁用 console （console.warn console.error 可用）
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // 不能有空的大括号
    'no-empty': ['error', { 'allowEmptyCatch': true }],

    // 不存在没有用到的变量
    'no-unused-vars': ['warn', {
      'vars': 'local',
      'caughtErrors': 'none',
      'args': 'none'
    }],

    // 数组中不能有额外的逗号（结尾可以有逗号）
    'no-sparse-arrays': 'warn',

    // 在普通字符串中不能用模板字符串的语法
    'no-template-curly-in-string': 'warn',

    // 不能有执行不到的代码
    'no-unreachable': 'warn',

    // 存在 if(true) 或者 if(false)
    'no-constant-condition': 'warn',

    // 不可以有相同的 case 语句
    'no-duplicate-case': 'warn',

    // 禁止自己和自己比较或赋值
    'no-self-compare': 'warn',
    'no-self-assign': 'warn',

    // 不能有额外的 fn.bind
    'no-extra-bind': 'warn',

    // 不能有无用的 fn.call 和 fn.apply
    // 'no-useless-call': 'warn',

    // map reduce find every some filter sort 中的回调函数必须有返回值
    'array-callback-return': 'warn',

  }
}
