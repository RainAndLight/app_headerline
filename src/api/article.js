import request from '@/utils/requset'

// 文章相关api
export function getChannel () {
  return request({
    url: '/app/v1_0/user/channels'
  })
}

// 根据频道提供数据API
export function getArticelsList (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取所有频道
export function getAllChannels () {
  return request({
    url: '/app/v1_0/channels'
  })
}
