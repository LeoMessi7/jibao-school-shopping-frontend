/*
 * @Author Yuanhao Pei
 * @Description goods service api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function updateAvatar(formData){
  console.log(1)
  return axios({
    method: 'POST',
    url: '/user/info/updateAvatar',
    headers: {
      'Content-Type':'multipart/form-data'
    },
    params: formData
  })
}
