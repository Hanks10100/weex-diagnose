function getSize (count) {
  const std = x => Number(x.toFixed(2))
  if (count < 1e4) return `${std(count)} Byte`
  if (count < 1e7) return `${std(count / (1 << 10))} KB`
  if (count < 1e10) return `${std(count / (1 << 20))} MB`
  if (count < 1e13) return `${std(count / (1 << 30))} GB`
  if (count < 1e16) return `${std(count / Math.pow(2, 40))} TB`
  if (count < 1e19) return `${std(count / Math.pow(2, 50))} PB`
  if (count < 1e22) return `${std(count / Math.pow(2, 60))} EB`
  if (count < 1e25) return `${std(count / Math.pow(2, 70))} ZB`
  if (count < 1e28) return `${std(count / Math.pow(2, 80))} YB`
  if (count < 1e31) return `${std(count / Math.pow(2, 90))} BB`
  return 'too large'
}

function getTime (count) {
  const std = x => Number(x.toFixed(3))
  if (count < 1e4) return `${std(count)} us`
  if (count < 1e7) return `${std(count / 1e3)} ms`
  if (count < 6e7) return `${std(count / 1e6)} s`

  let remain = count / 1e6
  const res = [`${std(remain % 60)}s`]
  remain = (remain / 60) | 0
  if (remain >= 1) { res.unshift(`${remain % 60}min`) }
  remain = (remain / 60) | 0
  if (remain >= 1) { res.unshift(`${remain % 24}h`) }
  remain = (remain / 24) | 0
  if (remain >= 1) { res.unshift(`${remain % 365}day`) }
  remain = (remain / 365) | 0
  if (remain >= 1) { res.unshift(`${remain}year`) }
  return res.join(' ')
}

function formatter (type, value) {
  switch (type) {
    case 'size': return getSize(value)
    case 'time': return getTime(value)
  }
  return value
}

module.exports = formatter
