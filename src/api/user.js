import request from '../utils/requset'

// login登录API
export default function login (params) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: params
  })
}
