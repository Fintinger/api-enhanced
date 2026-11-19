// 音乐黑名单 - 添加
// contentType: song | artist
// contentIdList: 官方要求 JSON 数组字符串，如 ["123"]；这里兼容 "123" / "1,2,3" / 数组
const createOption = require('../util/option.js')

function toIdList(v) {
  if (Array.isArray(v)) return JSON.stringify(v.map(String))
  if (v === undefined || v === null || v === '') return '[]'
  const s = String(v).trim()
  if (s.startsWith('[')) {
    try {
      const arr = JSON.parse(s)
      if (Array.isArray(arr)) return JSON.stringify(arr.map(String))
    } catch (e) {
      // 不是合法 JSON，退到逗号分隔
    }
  }
  return JSON.stringify(
    s
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean),
  )
}

module.exports = (query, request) => {
  const data = {
    contentType: query.contentType || 'song',
    contentIdList: toIdList(query.contentIdList || query.id),
  }
  return request('/api/music-blacklist/add', data, createOption(query, 'api'))
}
