/**
 * @author Yuanhao Pei
 * @description 登录api
 * @date 2021/12/8
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export const loginGet = (map) => {
  return axios({
    method: 'POST',
    url: 'http://localhost:8081/login/checkAccount',
    params: map
  })
}
