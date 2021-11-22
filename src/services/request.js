import axios from 'axios'
import router from '../router';
import Utils from '../utils';

const BASE_URL = 'http://119.91.148.123:12008'
const TIME_OUT = 60000
export default function chRequest(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
  })

  instance.interceptors.request.use(
    config => {
      config.headers['Authorization'] = sessionStorage.getItem('Authorization')
      Utils.update('loading', true)
      return config
    },
    error => {
      return Promise.reject(error);
    }
  )

  // http response 拦截器
  instance.interceptors.response.use(
    response => {
      Utils.update('loading', false)
      //拦截响应，做统一处理
      if(response.data.code === 401) {
        sessionStorage.removeItem('Authorization')
        router.replace('/login')
      } else {
        if (response.data.success) {
          return response.data
        } else {
          throw response.data
        }
      }
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
      return Promise.reject(error) // 返回接口返回的错误信息
    })

  return instance(config)
}
