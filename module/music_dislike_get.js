// 音乐黑名单 - 获取（歌曲 / 歌手 / 播客）
// 走 /api/ 明文通道：实测无需 eapi/weapi 加密，带登录 cookie 即可
const createOption = require('../util/option.js')
module.exports = (query, request) => {
  return request('/api/music/dislike/get', {}, createOption(query, 'api'))
}
