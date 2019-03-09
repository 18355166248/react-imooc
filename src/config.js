import axios from 'axios'
import { Toast } from 'antd-mobile'

// axios.defaults.baseURL = 'http://localhost:3001'

axios.interceptors.request.use(function(config) {
  Toast.loading('加载中...', 0)
  return config
}, function(error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function(config) {
  Toast.hide()
  return config
}, function(error) {
  return Promise.reject(error)
})