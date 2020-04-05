import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store/index.js'
// baseURL处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 处理大数字
request.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {} // 换了一个转化方法 使得 计算更精确 保证id不失真
}]

// 请求拦截器 统一添加token
request.interceptors.request.use(
  (config) => {
    // console.log(config)
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  })

export default request
