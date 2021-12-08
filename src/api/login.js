/**
 * @author Yuanhao Pei
 * @description 登录api
 * @date 2021/12/8
 */

import axiosInstance from "./index.js"

const axios = axiosInstance

export const loginGet = (email, password) => {

  const map = {email: email, password: password}

  return axios({
    method: 'POST',
    url: 'http://localhost:8081/login/checkAccount',
    params: map
  })
}
