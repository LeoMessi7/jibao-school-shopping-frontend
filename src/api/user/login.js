/**
 * @author Yuanhao Pei
 * @description 登录api
 * @date 2021/12/8
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function loginGet(map){
  return axios({
    method: 'POST',
    url: 'http://localhost:8081/login/checkAccount',
    params: map
  })
}

export function getImageCaptcha(){
  return axios({
    method: 'GET',
    url: 'http://localhost:8081/login/getImageCaptcha',
    headers: {
      isToken: false
    },
    responseType: 'arraybuffer',
    timeout: 20000
  })
}
