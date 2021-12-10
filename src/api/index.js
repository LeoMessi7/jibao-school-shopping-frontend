/**
 * @author Yuanhao Pei
 * @date 2021/12/8
 */

import Vue from 'vue'
import Axios from 'axios'

const axiosInstance = Axios.create({
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    const regex = /.*csrftoken=([^;.]*).*$/
    config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]
    return config
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

//axiosInstance.defaults.baseURL = 'http://localhost:8081/'

Vue.prototype.axios = axiosInstance

export default axiosInstance
