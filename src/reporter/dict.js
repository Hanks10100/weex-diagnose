
const ERROR_MESSAGE_MAP = {
  '002312': {}
}

function getMessage (id) {
  // TODO: 解析 id 格式
  return ERROR_MESSAGE_MAP[id]
}

module.exports = {
  ERROR_MESSAGE_MAP,
  getMessage
}
