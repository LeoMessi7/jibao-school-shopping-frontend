/*
 * @Author Yuanhao Pei
 * @Description goods service api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function updateAvatar(image){
  const map = {avatar: image}
  return axios({
    method: 'POST',
    url: 'http://localhost:8081/user/info/updateAvatar',
    headers: {
      isToken: true,
      'Content-Type':'application/json'
    },
    params: map
  })
}
