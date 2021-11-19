import axios from 'axios'

const BASE_URL = ''
const TIME_OUT = 60000
export default function chRequest(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
  })

  // http response 拦截器
  instance.interceptors.response.use(
    async response => {
      //拦截响应，做统一处理
      if (response.data.code === 0) {
        return response.data
      } else {
        throw response.data
      }
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
      return Promise.reject(error) // 返回接口返回的错误信息
    })

  return instance(config)
}
