# 输出校验结果

执行下发的命令，会把校验 `path/to/source/` 下的所有文件，然后把结果输出到 `report.json` 中（`-s` 表示 silent，使控制台无输出）。

```
weex-diagnose -s path/to/source/ -o report.json
```

## 报告的格式

报告结果以 JSON 格式输出，是个二维数组。

+ 第一层数组的长度表示的是输入的文件数。如果 `path/to/source/` 下有 16 文件，输出结果就是个长度为 16 的数组。
+ 第二层数组表示每个文件的校验（执行）次数，针对校验功能，只会执行一次，数组的长度都是 1。

## 单项结果的字段

对于二维数组里的每一项，都包含了如下字段：

+ `info`: 文件信息。
+ `tips`: 校验出的修改建议，不影响功能，但是代码不是最佳实践。
+ `warnings`: 警告，代码可以工作，但是某些行为很可能会出现异常。
+ `errors`: 错误，代码中有影响功能的错误。
+ `summary`: 页面的一些统计信息。

### info

+ `src`: 原文件的路径。
+ `iteration`: 每个文件的迭代次数，默认是 1。
+ `packages`: 指定依赖的版本，默认为空。
+ `output`: 输出文件的路径。

### tips & warnings & errors

tips & warnings & errors 中的格式是相同的。

| 字段 | 类型 | 含义 | 值 |
| - | - | - | - |
| `type` | String | 来源 | eslint & style & template |
| `ruleId` | String | 错误 ID 或名称 | eslint ruleId 或者空 |
| `message` | String | 错误描述 | - |
| `line` | Number | 出错位置的行号 | - |
| `column` | Number | 出错位置的列号 | - |
| `source` | String | 出错的代码片段 | 不一定全都有 |

### summary

这些信息只在页面能够在 node 环境下执行时才会有效，否则并无实际意义。

+ `bundleSize`: 页面代码体积。
+ `totalCount`: 页面总的节点数。
+ `totalDepth`: 页面节点的最大深度。
+ `messageSize`: js-native 之间的通信数据量。
+ `timecost`: virtual-dom 构建消耗的时间。
